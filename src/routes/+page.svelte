<script lang="ts">
    import data from '$lib/data/data.json';
    import ReleaseCard from '$lib/components/ReleaseCard.svelte';
    import { base } from '$app/paths';

    const slug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

    const allReleases = data.artists.flatMap((artist) =>
        artist.releases.map((release) => ({ ...release, artist }))
    ).sort((a, b) => a.title.localeCompare(b.title));
</script>

<h1>harbord village 2026</h1>

<p>The <span class="scene-name">harbord village music scene</span> of Toronto, Ontario as of 2026. Active since 2023. Contains {data.artists.length} artists and {data.people.length} people.</p>

{#each [...data.artists].sort((a, b) => a.name.localeCompare(b.name)) as artist, i (slug(artist.name))}
    <a href="{base}/artists/{slug(artist.name)}">{artist.name}</a>{#if i < data.artists.length - 1},&nbsp;{/if}
{/each}

<br/><br/>

{#each [...data.people].sort((a, b) => a.name.localeCompare(b.name)) as person, i (slug(person.name))}
    <a href="{base}/people/{slug(person.name)}">{person.name}</a>{#if i < data.people.length - 1},&nbsp;{/if}
{/each}

<div class="grid">
  {#each allReleases as release (release.title)}
    <ReleaseCard
      title={release.title}
      type={release.type}
      year={release.year}
      cover={release.cover}
      href="{base}/artists/{slug(release.artist.name)}"
      showInfo={false}
    />
  {/each}
</div>

<style>
    h1 {
        margin-bottom: 1rem;
    }
    .scene-name {
        font-weight: 1000;
    }
    p {
        margin-bottom: 1rem;
    }
</style>