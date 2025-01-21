const axios = require('axios');
const showError = require('../logs/showError');

const fetchCosmetic = async (searchParams) => {
  try {
    const { data } = await axios.get(`https://fortnite-api.com/v2/cosmetics/br/search`, { params: searchParams });
    if (!data || !data.data) {
      throw new Error('No cosmetic matching the search parameters was found');
    }
    return data.data;
  } catch (error) {
    showError('Error fetching cosmetic:', error.message);
    throw error;
  }
};

module.exports = fetchCosmetic;

