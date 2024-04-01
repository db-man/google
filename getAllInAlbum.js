const { list } = require('./list');
const { search } = require('./search');

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
};

main(process.env.ALBUM_TITLE);
