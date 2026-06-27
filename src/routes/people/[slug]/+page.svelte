<script lang="ts">
    import { page } from '$app/state';
    import data from '$lib/data/data.json';
    import { base } from '$app/paths';

    const slug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

    const person = $derived(
        data.people.find((p) => p.slug === page.params.slug) ?? null
    );

    const projects = $derived(
        data.artists.filter((a) => a.members?.includes(page.params.slug))
    );
</script>

<h1>
    <a href="{base}/">harbord village 2026</a> - {#if person}{person.name}{:else}Person not found{/if}
</h1>

{#if person}
    {#each [...projects].sort((a, b) => a.name.localeCompare(b.name)) as artist (slug(artist.name))}
        <p><a href="{base}/artists/{slug(artist.name)}">{artist.name}</a></p>
    {/each}
{/if}