// Returns a summary string for an array: first item, and '+N' if more
export function formatListSummary(value: unknown): string {
  if (Array.isArray(value) && value.length > 0) {
    return value[0] + (value.length > 1 ? ', +' + (value.length - 1) : '');
  }
  return '-';
}
