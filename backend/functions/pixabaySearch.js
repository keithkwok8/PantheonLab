const config = require('../config.js');

const pixabaySearch = async (searchTerm) => {
    try {
        // Create the endpoint
        const endpoint = new URL(config.pixabay.endpoint);

        // Add the parameters to the endpoint
        endpoint.searchParams.append("query", searchTerm);
        endpoint.searchParams.append(config.pixabay.apiKey.name, config.pixabay.apiKey.key);

        // Fetch the data from the endpoint
        const response = await fetch(endpoint.toString());
        const data = await response.json();

        // Format the data and return it
        return data.hits.map((image) => ({
            image_ID: image.id,
            thumbnails: image.previewURL,
            preview: image.largeImageURL,
            title: image.title ? image.title : null,
            source: 'Pixabay',
            tags: image.tags.split(',').map((tag) => tag.trim()),
        }));
    } catch (error) {
        console.log('Error in pixabaySearch', error);
        // Return an empty array if there is an error
        return [];
    }
}

module.exports = pixabaySearch;