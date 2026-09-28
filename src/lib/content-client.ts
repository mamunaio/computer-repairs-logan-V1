export interface ContentResponse {
  site: {
    suburb: string;
    slug: string;
  };
  hero: {
    heading: string;
    subheading: string;
    description: string;
    bullet_1: string;
    bullet_2: string;
    bullet_3: string;
  };
  seo: {
    title: string;
    description: string;
  };
}

export async function fetchContent(slug: string): Promise<ContentResponse> {
  const baseUrl = import.meta.env.CONTENT_API_URL || process.env.CONTENT_API_URL;
  if (!baseUrl) {
    throw new Error(
      `[content-client] Missing CONTENT_API_URL environment variable during build. Please ensure .env contains CONTENT_API_URL.`
    );
  }

  const cleanBase = baseUrl.replace(/\/+$/, '');
  const url = `${cleanBase}/api/content/${slug}`;

  let response: Response;
  try {
    response = await fetch(url, {
      headers: {
        'User-Agent': 'Astro-Build-Client/1.0',
        Accept: 'application/json',
      },
    });
  } catch (networkError: any) {
    throw new Error(
      `[content-client] Network failure while fetching content from ${url}: ${networkError.message || networkError}`
    );
  }

  if (!response.ok) {
    throw new Error(
      `[content-client] Failed to fetch content for slug "${slug}". HTTP ${response.status} ${response.statusText} from ${url}`
    );
  }

  let json: any;
  try {
    json = await response.json();
  } catch (parseError: any) {
    throw new Error(
      `[content-client] Failed to parse JSON response from ${url}: ${parseError.message || parseError}`
    );
  }

  if (!json || json.status !== 'success' || !json.content) {
    throw new Error(
      `[content-client] Invalid response payload shape for slug "${slug}" from ${url}: ${JSON.stringify(json)}`
    );
  }

  const { content } = json;

  // Strict required field validation
  const requiredFields: Array<{ name: string; value: any }> = [
    { name: 'site.suburb', value: content.site?.suburb },
    { name: 'site.slug', value: content.site?.slug },
    { name: 'hero.heading', value: content.hero?.heading },
    { name: 'hero.subheading', value: content.hero?.subheading },
    { name: 'hero.description', value: content.hero?.description },
    { name: 'hero.bullet_1', value: content.hero?.bullet_1 },
    { name: 'hero.bullet_2', value: content.hero?.bullet_2 },
    { name: 'hero.bullet_3', value: content.hero?.bullet_3 },
    { name: 'seo.title', value: content.seo?.title },
    { name: 'seo.description', value: content.seo?.description },
  ];

  for (const field of requiredFields) {
    if (typeof field.value !== 'string' || field.value.trim() === '') {
      throw new Error(
        `[content-client] Required content field "${field.name}" is missing or empty in API response for slug "${slug}".`
      );
    }
  }

  return content as ContentResponse;
}
