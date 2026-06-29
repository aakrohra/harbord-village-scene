<script lang="ts">
  import { onMount } from 'svelte';
  import data from '$lib/data/data.json';
  import { slug } from '$lib/utils';
  import { base } from '$app/paths';

  const width = 800;
  const height = 600;

  const artistNodes = data.artists.map((a, i) => ({
    id: slug(a.name), label: a.name, type: 'artist',
    x: width / 2 + Math.cos((i / data.artists.length) * 2 * Math.PI) * 200,
    y: height / 2 + Math.sin((i / data.artists.length) * 2 * Math.PI) * 200
  }));

  const peopleNodes = data.people.map((p, i) => ({
    id: p.slug, label: p.name, type: 'person',
    x: width / 2 + Math.cos((i / data.people.length) * 2 * Math.PI) * 350,
    y: height / 2 + Math.sin((i / data.people.length) * 2 * Math.PI) * 350
  }));

  const nodes = [...artistNodes, ...peopleNodes];

  const links = data.artists.flatMap((a) => [
    ...(a['current-members'] ?? []).map((m) => ({ source: m.slug, target: slug(a.name) })),
    ...(a['past-members'] ?? []).map((m) => ({ source: m.slug, target: slug(a.name) }))
  ]);

  const getNode = (id: string) => nodes.find((n) => n.id === id);
</script>

<svg viewBox="0 0 {width} {height}" width="100%">
  {#each links as link (link)}
    {@const s = getNode(link.source)}
    {@const t = getNode(link.target)}
    {#if s && t}
      <line x1={s.x} y1={s.y} x2={t.x} y2={t.y} stroke="#444" stroke-width="1" />
    {/if}
  {/each}

  {#each nodes as node (node)}
    <a href={node.type === 'artist' ? `${base}/artists/${node.id}` : `${base}/people/${node.id}`}>
      <circle cx={node.x} cy={node.y} r={node.type === 'artist' ? 10 : 6} fill={node.type === 'artist' ? 'darkgreen' : '#888'} />
      <text x={node.x + 12} y={node.y + 4} font-size="0.7rem" fill="currentColor">{node.label}</text>
    </a>
  {/each}
</svg>