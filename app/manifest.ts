import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mood Wallpaper',
    short_name: 'Mood',
    description: 'Track your mood, paint your year.',
    start_url: '/log', // <--- THIS IS THE KEY CHANGE
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon.png', // Make sure you have an icon
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}