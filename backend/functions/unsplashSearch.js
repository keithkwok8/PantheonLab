const config = require('../config.js');

const unsplashSearch = async (searchTerm) => {
  try {
    // Create the endpoint
    const endpoint = new URL(config.unsplash.endpoint);

    // Add the parameters to the endpoint
    endpoint.searchParams.append("query", searchTerm);
    endpoint.searchParams.append(config.unsplash.apiKey.name, config.unsplash.apiKey.key);

    // Fetch the data from the endpoint
    const response = await fetch(endpoint.toString());
    const data = await response.json();

    // Format the data and return it
    return data.results.map((image) => ({
      image_ID: image.id,
      thumbnails: image.urls.thumb,
      preview: image.urls.regular,
      title: image.alt_description,
      source: 'Unsplash',
      tags: image.tags.map((tag) => tag.title)
    }));

  } catch (error) {
    console.log('Error in unsplashSearch', error);
    // Return an empty array if there is an error
    return [];
  }
}

module.exports = unsplashSearch;
