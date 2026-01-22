export const endpoints = {
  posts: (websiteId) => `/communication/websites/${websiteId}/posts`,
  projects: (websiteId) => `/communication/websites/${websiteId}/portfolio/projects`,
  media: () => '/communication/medias',
};