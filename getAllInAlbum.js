/**
 * This script fetches all the media items in a specific album and writes the
 * filenames to a JSON file.
 *
 * Usage:
 *  node getAllInAlbum.js
 *
 * The output file content:
 * ```json
 * [
 *   "IMG_20191001_123456.jpg",
 *   "IMG_20191001_123457.jpg",
 *   "IMG_20191001_123458.jpg",
 *   ...
 * ]
 * ```
 */

const fs = require('fs');
const { list } = require('./list');
const { search } = require('./search');

console.time('getAllInAlbum.js');

const main = async (albumTitle) => {
  const albums = await list();
  const album = albums.albums.find((album) => album.title === albumTitle);

  if (!album) {
    console.error('Album not found');
    return;
  }

  console.log('Album:', album.title, album.id);

  let photoFilenames = [];
  let pageToken = null;
  do {
    console.log('Fetching page:', pageToken);
    const searchResponse = await search(album.id, pageToken);
    photoFilenames = [
      ...photoFilenames,
      ...searchResponse.mediaItems.map((photo) => photo.filename),
    ];
    pageToken = searchResponse.nextPageToken;
  } while (pageToken);

  console.log(photoFilenames);

  fs.writeFileSync(
    `${album.title}.json`,
    JSON.stringify(photoFilenames, null, 2)
  );
};

main(process.env.ALBUM_TITLE);

console.timeEnd('getAllInAlbum.js');
