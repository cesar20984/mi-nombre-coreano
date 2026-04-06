/**
 * Central routes configuration.
 * 
 * Add any new static page here and it will automatically:
 * 1. Be registered as a route in App.jsx
 * 2. Be included in the sitemap.xml at build time
 * 
 * Dynamic routes (like /my-name/:name) are handled separately
 * and won't appear in the sitemap since they're user-generated.
 */

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

export const staticRoutes = [
  { path: '/',             priority: '1.0',  changefreq: 'weekly'  },
  { path: '/significados', priority: '0.8',  changefreq: 'monthly' },
  { path: '/diccionario',  priority: '0.8',  changefreq: 'monthly' },
  ...alphabet.map(letter => ({ 
    path: `/diccionario/${letter}`, 
    priority: '0.6', 
    changefreq: 'monthly' 
  })),
  { path: '/mascotas',     priority: '0.7',  changefreq: 'monthly' },
  { path: '/tatuajes',     priority: '0.7',  changefreq: 'monthly' },
];

export const dynamicRoutes = [
  { path: '/my-name/:name' },
  { path: '/saju/:name' },
  { path: '/meaning/:name' },
];
