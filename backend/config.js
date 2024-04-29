const config = {
    unsplash: {
        endpoint: 'https://api.unsplash.com/search/photos',
        apiKey: {
            name: 'client_id',
            key: 'Ut4HknhsA_as_J_kTircFJG86tCwo2_7TEZjIxY_C6s'
        }
    },
    pixabay: {
        endpoint: 'https://pixabay.com/api/',
        apiKey: {
            name: 'key',
            key: '43622827-6adb9fd5952a9f15706ba6694'
        }
    },
    storyblocks:{
        endpoint: 'https://api.graphicstock.com',
        resource:'/api/v2/images/search',
        apiKey:{
            publicKey: 'test_4dd1791857ee4d66316bbee15ba8ac02e8de18b218ff4353f768f3a8fd4',
            privateKey: 'test_5571dade17a64f77a3fb33905fa5c064c3b96cdfb87c434a42c66bd6899'
        },
        user_id: '6779b551-89b9-4780-8863-889b3cdbacac',
        project_id: '56d41326-3dbf-4f00-bec0-b5dc69be43b5'
    }
}

module.exports = config;