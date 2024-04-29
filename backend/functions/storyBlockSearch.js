const config = require('../config.js');
const crypto = require('crypto');

const storyBlockSearch = async (searchTerm) => {
    try {
        // Create the endpoint
        // Calculate the HMAC using the private key and the current time
        const resource = config.storyblocks.resource;
        const endpoint = new URL(`${config.storyblocks.endpoint}${resource}`);
        const publicKey = config.storyblocks.apiKey.publicKey;
        const privateKey = config.storyblocks.apiKey.privateKey;
        const expires = Math.floor(Date.now() / 1000) + 100;
        const hmacBuilder = crypto.createHmac('sha256', privateKey + expires);
        hmacBuilder.update(resource);
        const hmac = hmacBuilder.digest('hex');

        // Add the parameters to the endpoint
        endpoint.searchParams.append('keywords', searchTerm);
        endpoint.searchParams.append('APIKEY', publicKey);
        endpoint.searchParams.append('EXPIRES', expires);
        endpoint.searchParams.append('HMAC', hmac);
        endpoint.searchParams.append('project_id', config.storyblocks.project_id);
        endpoint.searchParams.append('user_id', config.storyblocks.user_id);

        // Fetch the data from the endpoint
        const response = await fetch(endpoint.toString());
        const data = await response.json();

        console.log('Example in storyBlockSearch', data.results[0]);

        // Format the data and return it
        return data.results.map((image) => ({
            image_ID: image.id,
            thumbnails: image.thumbnail_url,
            preview: image.preview_url,
            title: image.title,
            source: 'StoryBlocks',
            tags: []
        }));
    } catch (error) {
        console.log('Error in storyBlockSearch', error);
        // Return an empty array if there is an error
        return [];
    }
}

module.exports = storyBlockSearch;

