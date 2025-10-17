export async function getGamesResponse(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: string = await response.json();
    return data;
  } catch(err) {
    console.error('Error fetching data:', err);
    throw err;
  }
}