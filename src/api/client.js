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
      const errorBody = await response.text();
      let errorDetails;
      try {
        errorDetails = JSON.parse(errorBody);
      } catch {
        errorDetails = errorBody;
      }
      
      console.error('\x1b[31m=== Erreur API ===\x1b[0m');
      console.error('Status:', response.status, response.statusText);
      console.error('Détails:', JSON.stringify(errorDetails, null, 2));
      
      throw new Error(`Response status: ${response.status} - ${response.statusText}`);
    }


    return await response.json();
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}