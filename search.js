const axios = require('axios');
require('dotenv').config();

const search = async (albumId, pageToken) => {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `https://content-photoslibrary.googleapis.com/v1/mediaItems:search?alt=json&key=${process.env.API_KEY}`,
    headers: {
      authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      'x-referer': 'https://explorer.apis.google.com',
      'content-type': 'application/json',
    },
    data: JSON.stringify({
      albumId: albumId,
      pageSize: 100,
      pageToken: pageToken,
    }),
  };
  return axios
    .request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(`Failed to search photos: ${error.message}:`, error);
      throw new Error(`Failed to search photos: ${error.message}`);
    });
};

// (async () => {
//   console.log(await search(process.env.ALBUM_ID));
// })();

module.exports = {
  search,
};
