export interface SiteContent {
  suburb: string;
  slug: string;
}

export interface HeroContent {
  heading: string;
  subheading: string;
  description: string;
  bullet_1: string;
  bullet_2: string;
  bullet_3: string;
}

export interface SeoContent {
  title: string;
  description: string;
}

export interface ContentData {
  site: SiteContent;
  hero: HeroContent;
  seo: SeoContent;
}

export interface ContentApiResponse {
  status: 'success';
  slug: string;
  content: ContentData;
}

function validateContentResponse(data: any, slug: string): asserts data is ContentApiResponse {
  if (!data || typeof data !== 'object') {
    throw new Error(`[Content API Error] Response for slug '${slug}' is not a valid JSON object.`);
  }

  if (data.status !== 'success') {
    throw new Error(`[Content API Error] API returned non-success status for slug '${slug}': ${data.message || 'Unknown error'}`);
  }

  if (!data.content || typeof data.content !== 'object') {
    throw new Error(`[Content API Error] Missing 'content' object in API response for slug '${slug}'.`);
  }

  const { site, hero, seo } = data.content;

  if (!site || typeof site !== 'object') {
    throw new Error(`[Content API Error] Missing 'content.site' in API response for slug '${slug}'.`);
  }
  if (!site.suburb || typeof site.suburb !== 'string') {
    throw new Error(`[Content API Error] Missing required field 'content.site.suburb' for slug '${slug}'.`);
  }
  if (!site.slug || typeof site.slug !== 'string') {
    throw new Error(`[Content API Error] Missing required field 'content.site.slug' for slug '${slug}'.`);
  }

  if (!hero || typeof hero !== 'object') {
    throw new Error(`[Content API Error] Missing 'content.hero' in API response for slug '${slug}'.`);
  }
  if (!hero.heading || typeof hero.heading !== 'string') {
    throw new Error(`[Content API Error] Missing required field 'content.hero.heading' for slug '${slug}'.`);
  }
  if (!hero.subheading || typeof hero.subheading !== 'string') {
    throw new Error(`[Content API Error] Missing required field 'content.hero.subheading' for slug '${slug}'.`);
  }
  if (!hero.description || typeof hero.description !== 'string') {
    throw new Error(`[Content API Error] Missing required field 'content.hero.description' for slug '${slug}'.`);
  }

  if (!seo || typeof seo !== 'object') {
    throw new Error(`[Content API Error] Missing 'content.seo' in API response for slug '${slug}'.`);
  }
  if (!seo.title || typeof seo.title !== 'string') {
    throw new Error(`[Content API Error] Missing required field 'content.seo.title' for slug '${slug}'.`);
  }
  if (!seo.description || typeof seo.description !== 'string') {
    throw new Error(`[Content API Error] Missing required field 'content.seo.description' for slug '${slug}'.`);
  }
}

export async function fetchContent(apiBaseUrl: string, slug: string): Promise<ContentApiResponse> {
  const cleanBaseUrl = apiBaseUrl.replace(/\/+$/, '');
  const url = `${cleanBaseUrl}/api/content/${encodeURIComponent(slug)}`;

  let response: Response;
  try {
    response = await fetch(url);
  } catch (error) {
    throw new Error(`[Content API Error] Network failure fetching content from '${url}': ${error instanceof Error ? error.message : String(error)}`);
  }

  if (!response.ok) {
    let errorDetail = '';
    try {
      const errJson = (await response.json()) as { message?: string };
      errorDetail = errJson.message ? ` - ${errJson.message}` : '';
    } catch {
      // ignore json parse error on error response
    }
    throw new Error(`[Content API Error] Failed to fetch content for slug '${slug}' from '${url}'. HTTP Status: ${response.status} (${response.statusText})${errorDetail}`);
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch (error) {
    throw new Error(`[Content API Error] Failed to parse JSON response from '${url}': ${error instanceof Error ? error.message : String(error)}`);
  }

  validateContentResponse(data, slug);
  return data;
}
