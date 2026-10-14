import type { MetadataRoute } from 'next';
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Fieldwork',
    short_name: 'Fieldwork',
    description: 'Practise AI on real work.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F1EFEA',
    theme_color: '#262422',
    icons: [
      { src: '/brand/favicon/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/brand/favicon/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
