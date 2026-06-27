import data from '$lib/data/data.json';
export const slug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');
export const allReleases = data.artists.flatMap((artist) =>
    artist.releases.map((release) => ({ ...release, artist }))
);