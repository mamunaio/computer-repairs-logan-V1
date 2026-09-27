import homeData from '../data/pages/index.json';

export const getHome = async () => {
  try {
    const { requestWithMetadata } = await import('@tinacms/astro');
    const clientModule = await import('../../tina/__generated__/client');
    const client = clientModule.default;
    return await requestWithMetadata(client.queries.home({ relativePath: 'index.json' }));
  } catch (err) {
    return {
      data: {
        home: homeData,
      },
    };
  }
};
