/**
 * Island registry — the editable regions the Tina bridge can re-render.
 * Each key maps a slug under /tina-island/... to a fetcher, a component and
 * the wrapper element it renders into. Adding an editable page means adding
 * one entry here; the dynamic [name].ts route picks it up automatically.
 */
import type { IslandRegistry } from '@tinacms/astro/experimental';

import HomeBody from '../components/islands/HomeBody.astro';
import { getHome } from './data';

export const islands: IslandRegistry = {
  home: {
    fetch: () => getHome(),
    component: HomeBody,
    wrapper: { tag: 'div' },
    propsFromData: (data) => ({
      data: (data as { data?: { home?: unknown } }).data?.home,
    }),
  },
};
