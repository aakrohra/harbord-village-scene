<svelte:head>
  <title>{artist ? `harbord village's ${artist.name}` : 'Artist not found'}</title>
</svelte:head>

<script lang="ts">
    import { page } from '$app/state';
    import data from '$lib/data/data.json';
    import { base } from '$app/paths';
    import ReleaseCard from '$lib/components/ReleaseCard.svelte';

    import { slug } from '$lib/utils';

    const artist = $derived(
        data.artists.find((a) => slug(a.name) === page.params.slug) ?? null
    );
</script>

<h1>
    <a href="{base}/">harbord village 2026</a> - {#if artist}{artist.name}{:else}Artist not found{/if}
</h1>

{#if artist}
    {#if artist['years-active']}
        <p>{String(artist['years-active']).includes('-') ? 'Years active' : 'Year active'}: {artist['years-active']}</p>
    {/if}

    {#if artist['past-names'] && artist['past-names'].length > 0}
        <p>Past names: 
            {#each artist['past-names'] as pastName, i (pastName)}
                <span>{pastName.name} ({pastName['years-active']})</span>
                {#if i < artist['past-names'].length - 1},&nbsp;{/if}
            {/each}
        </p>
    {/if}

    {#if artist["current-members"] && artist["current-members"].length > 0}
        <p>Members: 
            {#each artist["current-members"] as member, i (member.slug)}
                {@const person = data.people.find((p) => p.slug === member.slug)}
                <a href="{base}/people/{member.slug}">{person?.name ?? member.slug}</a>
                ({member.instruments.join(', ')}){#if i < artist['current-members'].length - 1},&nbsp;{/if}
            {/each}
        </p>
    {/if}

    {#if artist['past-members'] && artist['past-members'].length > 0}
        <p>Past members:
            {#each artist['past-members'] as member, i (member.slug)}
                {@const person = data.people.find((p) => p.slug === member.slug)}
                <a href="{base}/people/{member.slug}">{person?.name ?? member.slug}</a>
                ({member.instruments.join(', ')}{#if member['years-active']}, {member['years-active']}{/if})
                {#if i < artist['past-members'].length - 1},&nbsp;{/if}
            {/each}
        </p>
    {/if}

    {#if artist.genre}
        <p class="genre">Genre: {artist.genre}</p>
    {/if}

    {#if artist.links}
        <ul>
            {#each Object.entries(artist.links) as [label, url] (slug(label))}
                <li><a href={url} target="_blank" rel="noopener">{label}</a></li>
            {/each}
        </ul>
    {/if}

    <div class="grid">
        {#each [...artist.releases].sort((a, b) => b.year - a.year) as release (release.title)}
            <ReleaseCard
                title={release.title}
                type={release.type}
                year={release.year}
                cover={release.cover}
                href={release.bandcamp}
                target="_blank"
            />
        {/each}
    </div>
{/if}