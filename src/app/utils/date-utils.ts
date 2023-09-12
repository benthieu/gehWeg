export function formatCHDate(unformatted?: string | null): string {
  return unformatted ? new Date(unformatted).toLocaleDateString('de-CH') : '';
}
