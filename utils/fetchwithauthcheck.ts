export async function fetchWithAuthCheck(
  url: string,
  options?: RequestInit,
): Promise<Response> {
  const response = await fetch(url, options);

  if (response.status === 401) {
    throw new Error('Unauthorized');
  }

  return response;
}
