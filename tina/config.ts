import { defineConfig } from 'tinacms';

// TinaCMS schema for computerrepairslogan.com.au.
//
// Mirrors src/data/pages/index.json field for field. The homepage is the only
// page converted to structured fields so far; the other 101 still hold raw
// headHtml/bodyHtml strings and are edited in Pages CMS until they are
// converted too.
//
// Local editing needs no account: `npm run tina:dev`, then /admin/index.html.
// Hosted editing needs a free Tina Cloud project supplying TINA_CLIENT_ID and
// TINA_TOKEN.
export default defineConfig({
  branch: process.env.TINA_BRANCH || 'main',
  clientId: process.env.TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'images',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'home',
        label: 'Home page',
        path: 'src/data/pages',
        match: { include: 'index' },
        format: 'json',
        ui: {
          allowedActions: { create: false, delete: false },
          router: () => '/',
        },
        fields: [
          {
            type: 'object',
            name: 'seo',
            label: 'Search listing',
            fields: [
              {
                type: 'string',
                name: 'title',
                label: 'Page title',
                description: 'What Google shows as the blue headline. Aim for under 60 characters.',
              },
              {
                type: 'string',
                name: 'description',
                label: 'Meta description',
                ui: { component: 'textarea' },
                description: 'The grey text under the headline in search results. 120 to 160 characters.',
              },
            ],
          },
          {
            type: 'object',
            name: 'hero',
            label: 'Top of page',
            fields: [
              { type: 'string', name: 'badge', label: 'Small badge above the heading' },
              { type: 'string', name: 'headingPlain', label: 'Heading, first part', description: 'Shown in white.' },
              { type: 'string', name: 'headingAccent', label: 'Heading, highlighted part', description: 'Shown in blue.' },
              { type: 'string', name: 'lead', label: 'Opening paragraph', ui: { component: 'textarea' } },
              { type: 'string', name: 'bookLabel', label: 'Button text' },
              { type: 'string', name: 'bookHref', label: 'Button link' },
              {
                type: 'string',
                name: 'trust',
                label: 'Tick points',
                list: true,
                description: 'The tick is added automatically.',
              },
              { type: 'image', name: 'imageSrc', label: 'Hero photo' },
              {
                type: 'string',
                name: 'imageAlt',
                label: 'Photo description',
                description: 'For screen readers and Google Images. Say what is happening in it.',
              },
              { type: 'number', name: 'imageWidth', label: 'Photo width in pixels' },
              { type: 'number', name: 'imageHeight', label: 'Photo height in pixels' },
            ],
          },
          {
            type: 'object',
            name: 'services',
            label: 'What We Fix section',
            fields: [
              { type: 'string', name: 'eyebrow', label: 'Small label above the heading' },
              { type: 'string', name: 'heading', label: 'Heading' },
              {
                type: 'string',
                name: 'introBefore',
                label: 'Intro text, before the link',
                ui: { component: 'textarea' },
                description: 'Keep the trailing space.',
              },
              { type: 'string', name: 'introLinkLabel', label: 'Link text' },
              { type: 'string', name: 'introLinkHref', label: 'Link URL' },
              { type: 'string', name: 'introAfter', label: 'Intro text, after the link' },
              {
                type: 'object',
                name: 'cards',
                label: 'Service cards',
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.title }),
                },
                fields: [
                  { type: 'string', name: 'icon', label: 'Emoji' },
                  { type: 'string', name: 'title', label: 'Title' },
                  { type: 'string', name: 'description', label: 'One-line description', ui: { component: 'textarea' } },
                  { type: 'string', name: 'href', label: 'Links to' },
                ],
              },
              { type: 'string', name: 'ctaLabel', label: 'Button text' },
              { type: 'string', name: 'ctaHref', label: 'Button link' },
            ],
          },
          {
            type: 'object',
            name: 'whyUs',
            label: 'Why Locals Call Us section',
            fields: [
              { type: 'string', name: 'eyebrow', label: 'Small label above the heading' },
              { type: 'string', name: 'heading', label: 'Heading' },
              {
                type: 'object',
                name: 'points',
                label: 'Points',
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.lead }),
                },
                fields: [
                  { type: 'string', name: 'lead', label: 'Bold opening' },
                  { type: 'string', name: 'text', label: 'Rest of the sentence', ui: { component: 'textarea' } },
                ],
              },
              { type: 'string', name: 'ctaLabel', label: 'Button text' },
              { type: 'string', name: 'ctaHref', label: 'Button link' },
            ],
          },
          {
            type: 'object',
            name: 'areas',
            label: 'Where We Work section',
            description: 'The suburb chips come from src/config/business.ts, which also feeds the schema areaServed so the two cannot drift.',
            fields: [
              { type: 'string', name: 'eyebrow', label: 'Small label above the heading' },
              { type: 'string', name: 'heading', label: 'Heading' },
              { type: 'string', name: 'intro', label: 'Intro text', ui: { component: 'textarea' } },
            ],
          },
          {
            type: 'object',
            name: 'faq',
            label: 'Common Questions section',
            fields: [
              { type: 'string', name: 'eyebrow', label: 'Small label above the heading' },
              { type: 'string', name: 'heading', label: 'Heading' },
              {
                type: 'object',
                name: 'items',
                label: 'Questions',
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.question }),
                },
                fields: [
                  { type: 'string', name: 'question', label: 'Question' },
                  { type: 'string', name: 'answer', label: 'Answer', ui: { component: 'textarea' } },
                ],
              },
            ],
          },
          {
            type: 'object',
            name: 'closingCta',
            label: 'Bottom banner',
            fields: [
              { type: 'string', name: 'heading', label: 'Heading' },
              { type: 'string', name: 'text', label: 'Text', ui: { component: 'textarea' } },
              { type: 'string', name: 'bookLabel', label: 'Button text' },
              { type: 'string', name: 'bookHref', label: 'Button link' },
            ],
          },
        ],
      },
    ],
  },
});
