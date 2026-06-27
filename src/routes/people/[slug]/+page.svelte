<svelte:head>
  <title>{person ? `harbord village's ${person.name}` : 'Person not found'}</title>
</svelte:head>

<script lang="ts">
    import { page } from '$app/state';
    import data from '$lib/data/data.json';
    import { base } from '$app/paths';

    import { slug } from '$lib/utils';

    const person = $derived(
        data.people.find((p) => p.slug === page.params.slug) ?? null
    );

    const projects = $derived(
        data.artists.filter((a) =>
        a['current-members']?.some((m) => m.slug === page.params.slug) ||
        a['past-members']?.some((m) => m.slug === page.params.slug)
        )
    );

</script>

<h1>
    <a href="{base}/">harbord village 2026</a> - {#if person}{person.name}{:else}Person not found{/if}
</h1>

{#if person}
    {#each [...projects].sort((a, b) => a.name.localeCompare(b.name)) as artist (slug(artist.name))}
        {@const currentMember = artist['current-members']?.find((m) => m.slug === page.params.slug)}
        {@const pastMember = artist['past-members']?.find((m) => m.slug === page.params.slug)}
        {@const member = currentMember ?? pastMember}
        <p>
            <a href="{base}/artists/{slug(artist.name)}">{artist.name}</a>
            {#if member?.instruments}({member.instruments.join(', ')}{#if !currentMember && pastMember?.['years-active']}, {pastMember['years-active']}{/if}){/if}
        </p>
    {/each}
{/if}