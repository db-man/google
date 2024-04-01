const axios = require('axios');
require('dotenv').config();

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: `https://content-photoslibrary.googleapis.com/v1/albums?key=${process.env.API_KEY}`,
  headers: {
    authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    'x-referer': 'https://explorer.apis.google.com',
  },
};

const list = async () => {
  return axios
    .request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(`Failed to list albums: ${error.message}:`, error);
      throw new Error(`Failed to list albums: ${error.message}`);
    });
};

// (async () => {
//   console.log(await list());
// })();

module.exports = {
  list,
};
