import fetch from 'node-fetch';

export async function apiPost(url, data, apiKey, isFormData = false) {
  const headers = {
    'X-Osuny-Token': apiKey
  };

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: isFormData ? data : JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}