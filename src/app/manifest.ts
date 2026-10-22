import type { MetadataRoute } from 'next';
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Fieldwork',
    short_name: 'Fieldwork',
    description: 'Websites and workflows for property businesses.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F3F2ED',
    theme_color: '#2340FF',
    icons: [
      { src: '/brand/favicon/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/brand/favicon/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
