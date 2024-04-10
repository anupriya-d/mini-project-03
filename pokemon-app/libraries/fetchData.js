const axios = require('axios');

//fuction to fetch any given url
const fetchData = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

module.exports = fetchData;
