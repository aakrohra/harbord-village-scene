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
</style>