export const site = {
  name: 'Gurus Classes of English',
  author: 'S.D. Singh Ratan',
  phone: '9829112945',
  telephone: '+919829112945',
  email: '',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://gurusclassesofenglish.com').replace(
    /\/$/,
    '',
  ),
  publisherUrl: (process.env.NEXT_PUBLIC_PUBLISHER_URL || '').replace(/\/$/, ''),
  facebook: 'https://www.facebook.com/GurusClassesOfEnglish/',
};
export function absolute(path: string) {
  return new URL(path, site.url).toString();
}
export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
