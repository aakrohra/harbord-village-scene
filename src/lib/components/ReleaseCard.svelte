<script lang="ts">
    import { base } from '$app/paths';
    const { title, type, year, cover, href, showInfo = true, target = '_self' } = $props<{
        title: string;
        type: string;
        year: number;
        cover: string;
        href: string;
        showInfo?: boolean;
        target?: string;
    }>();
</script>

<a {href} {target} class="card">
    {#if cover}
        <img src={`${base}${cover}`} alt={title} />
    {:else}
        <div class="placeholder">{title}</div>
    {/if}
    {#if showInfo}
        <p class="title">{title}</p>
        <p class="meta">{type} · {year}</p>
    {/if}
</a>

<style>
    .card {
        text-decoration: none;
        color: inherit;
    }

    img, .placeholder {
        width: 100%;
        aspect-ratio: 1;
        object-fit: cover;
        display: block;
        border-radius: 2px;
    }

    .placeholder {
        background: #222;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
        color: #aaa;
    }

    .title {
        margin: 0.4rem 0 0;
        font-weight: 500;
    }

    .meta {
        margin: 2px 0 0;
        font-size: 0.8rem;
        color: #aaa;
    }
</style>