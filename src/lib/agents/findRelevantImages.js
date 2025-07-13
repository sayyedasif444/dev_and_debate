// lib/agents/findRelevantImages.js
export async function findRelevantImages(title) {
  try {
    const query = encodeURIComponent(title);
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${query}&per_page=3`,
      {
        headers: {
          Authorization: process.env.PEXELS_API_KEY,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Pexels API request failed with status ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();

    if (!data.photos || data.photos.length === 0) {
      throw new Error('No images found for the given search query');
    }

    // Pick first 2 image URLs
    const images = data.photos.slice(0, 5).map((photo) => photo.src.large);

    if (images.length === 0) {
      throw new Error('Failed to extract image URLs from API response');
    }

    return images;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw new Error(`Failed to find relevant images: ${error.message}`);
  }
}
