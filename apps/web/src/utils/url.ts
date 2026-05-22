export function normalizeUrl(link: string): string {
  const trimmed = link.trim();

  if (!trimmed) {
    return trimmed;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

export function isWebUrl(value: string): boolean {
  const trimmed = value.trim();

  return (
    /^https?:\/\//i.test(trimmed)
    || trimmed.includes('.com')
    || trimmed.includes('.ca')
    || trimmed.includes('www.')
  );
}

export function openUrl(link: string): void {
  window.open(normalizeUrl(link), '_blank', 'noopener,noreferrer');
}

export function buildAvatarUrl(name: string, size: number): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=3b3b3b&color=fff&size=${size}`;
}

export function buildMapsUrl(location: string): string {
  return `https://www.google.com/maps/place/${encodeURIComponent(location)}`;
}

export function buildMailtoUrl(
  email: string,
  subject?: string,
  body?: string,
): string {
  const params = new URLSearchParams();

  if (subject) {
    params.set('subject', subject);
  }

  if (body) {
    params.set('body', body);
  }

  const query = params.toString();

  return query ? `mailto:${email}?${query}` : `mailto:${email}`;
}
