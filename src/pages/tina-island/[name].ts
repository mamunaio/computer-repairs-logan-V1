/**
 * The one on-demand route on an otherwise fully static site. The Tina bridge
 * calls /tina-island/home to re-render the editable region while you type;
 * public visitors never hit it.
 */
import type { APIRoute } from 'astro';
import { experimental_createIslandRoute } from '@tinacms/astro/experimental';
import { islands } from '../../lib/islands';

export const prerender = false;
export const ALL: APIRoute = experimental_createIslandRoute(islands);
