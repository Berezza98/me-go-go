import { API_BASE_URL, FLICKR_API_KEY, IMAGES_PER_PAGE_INIT, IMAGES_PER_PAGE_DEFAULT } from './constants.js';

export async function getRecentPhotos(page, isInitLoading = false) {
  const url = new URL(API_BASE_URL);
  const params = {
    method: 'flickr.photos.getRecent',
    api_key: FLICKR_API_KEY,
    format: 'json',
    nojsoncallback: 1,
    per_page: isInitLoading ? IMAGES_PER_PAGE_INIT : IMAGES_PER_PAGE_DEFAULT,
    extras: 'url_q',
    page,
  };
  Object.keys(params).forEach(paramName => url.searchParams.set(paramName, params[paramName]));

  const request = await fetch(url);
  const json = await request.json();
  console.log(json);
}

export function getRecentPhotosXHR(page, isInitLoading = false) {
  const url = new URL(API_BASE_URL);
  const params = {
    method: 'flickr.photos.getRecent',
    api_key: FLICKR_API_KEY,
    format: 'json',
    nojsoncallback: 1,
    per_page: isInitLoading ? IMAGES_PER_PAGE_INIT : IMAGES_PER_PAGE_DEFAULT,
    extras: 'url_q',
    page,
  };
  Object.keys(params).forEach(paramName => url.searchParams.set(paramName, params[paramName]));

  return new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url.href);

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return;
      }

      if (xhr.status != 200) {
        rej(xhr.statusText);
      } else {
        res(JSON.parse(xhr.responseText));
      }
    }

    xhr.send();
  });
}