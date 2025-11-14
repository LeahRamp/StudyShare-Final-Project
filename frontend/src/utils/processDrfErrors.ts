export function processDrfErrors(data: any): {
  fieldErrors?: Record<string, string>;
  message?: string;
} {
  const fieldErrors: Record<string, string> = {};
  if (!data || typeof data !== 'object') {
    return { message: 'Unexpected error occurred.'}
  }

  for (const [key, value] of Object.entries(data)) {
    fieldErrors[key] = Array.isArray(value) ? value[0] : String(value);
  }
  if (Object.keys(fieldErrors).length > 0) return { fieldErrors };

  if (data.detail) return { message: data.detail };
  if (data.message) return { message: data.message };

  return { message: 'Unknown error occurred.'}
}
