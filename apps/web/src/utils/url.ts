export function normalizeUrl(link: string): string {
  return link.substring(0, 4) !== 'http' ? `http://${link}` : link;
}

export function isWebUrl(value: string): boolean {
  return (
    value.substring(0, 4) === 'http'
    || value.includes('.com')
    || value.includes('.ca')
    || value.includes('www.')
  );
}

export function openUrl(link: string): void {
  window.open(normalizeUrl(link));
}
