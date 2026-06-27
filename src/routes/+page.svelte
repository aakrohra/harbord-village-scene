<svelte:head>
  <title>harbord village 2026</title>
</svelte:head>

<script lang="ts">
    import data from '$lib/data/data.json';
    import ReleaseCard from '$lib/components/ReleaseCard.svelte';
    import { base } from '$app/paths';
    import Search from '$lib/components/Search.svelte';
    import { allReleases, slug } from '$lib/utils';

    let matchedReleases = $state<typeof allReleases>([]);

    let searchActive = $state(false);
</script>

<h1>harbord village 2026</h1>

<p class="p-element">Toronto's <span>harbord village music scene</span>, active since 2023. {data.artists.length} artists and {data.people.length} people.</p>

<Search bind:isSearching={searchActive} bind:matchedReleases />

{#if !searchActive}
    <p class="p-element">{#each [...data.artists].sort((a, b) => a.name.localeCompare(b.name)) as artist, i (slug(artist.name))}
        <a href="{base}/artists/{slug(artist.name)}">{artist.name}</a>{#if i < data.artists.length - 1},&nbsp;{/if}
    {/each}</p>
    <p class="p-element">{#each [...data.people].sort((a, b) => a.name.localeCompare(b.name)) as person, i (person.slug)}
        <a href="{base}/people/{person.slug}">{person.name}</a>{#if i < data.people.length - 1},&nbsp;{/if}
    {/each}</p>
{/if}

{#if searchActive && matchedReleases.length !== 0}
    Releases:
{/if}
<div class="grid">
    {#each matchedReleases as release (release.title)}
        <ReleaseCard
            title={release.title}
            type={release.type}
            year={release.year}
            cover={release.cover}
            href="{base}/artists/{slug(release.artist.name)}"
            showInfo={searchActive}
        />
    {/each}
</div>

<style>
    span {
        font-weight: 1000;
    }
</style>