<script lang="ts">
    import data from '$lib/data/data.json';
    import { base } from '$app/paths';
    import { slug, allReleases } from '$lib/utils';

    let { isSearching = $bindable(false), matchedReleases = $bindable([]) } = $props<{
        isSearching?: boolean;
        matchedReleases?: typeof allReleases;
    }>();

    let query = $state('');

    const results = $derived(
        query.trim() === ''
            ? { artists: [], people: [], releases: [] }
            : {
                artists: data.artists
                .filter((a) => a.name.toLowerCase().includes(query.toLowerCase()))
                .sort((a, b) => a.name.localeCompare(b.name)),
                people: data.people
                .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
                .sort((a, b) => a.name.localeCompare(b.name)),
                releases: allReleases
                .filter((r) => r.title.toLowerCase().includes(query.toLowerCase()))
                .sort((a, b) => a.title.localeCompare(b.title))
            }
    );

    $effect(() => {
        isSearching = query.trim() !== '';
        matchedReleases = isSearching ? results.releases : allReleases;
    });
</script>

<input autocomplete="off" bind:value={query} placeholder="Search artists, people, releases" />

{#if isSearching}
    {#if results.artists.length !== 0}
        <p class="p-element">Artists:
        {#each results.artists as artist, i (artist.name)}
            <a href="{base}/artists/{slug(artist.name)}">{artist.name}</a>{#if i < results.artists.length - 1},&nbsp;{/if}
        {/each}</p>
    {/if}
    {#if results.people.length !== 0}
        <p class="p-element">People:
        {#each results.people as person, i (person.slug)}
            <a href="{base}/people/{person.slug}">{person.name}</a>{#if i < results.people.length - 1},&nbsp;{/if}
        {/each}</p>
    {/if}
{/if}

<style>
    input {
        width: 100%;
        padding: 0.5rem;
        margin-bottom: 1rem;
    }
</style>