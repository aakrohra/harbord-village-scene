import data from '$lib/data/data.json';

export const slug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

export const allReleases = data.artists.flatMap((artist) =>
    artist.releases.map((release) => ({ ...release, artist }))
).sort((a, b) => a.title.localeCompare(b.title));

export const randomArtist = () => data.artists[Math.floor(Math.random() * data.artists.length)];