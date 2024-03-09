export const getGalleryURL = (path: string) => {
  const url = `${process.env.NEXT_PUBLIC_GALLERY_URL}${path}`
  return url;
};

const fetchGalleryI = (async () => {
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
    }
  };

  const response = await fetch(getGalleryURL('/manifest.json'), mergedOptions).catch(e => e);
  if (response instanceof Error) {
    console.log(response);
    throw response;
  }
  if (!response.ok) {
    console.error(response.statusText);
    throw new Error(response.statusText);
  }
  const data = await response.json();
  data.map((d: any) => {
    d.images = d.images.map((i: any) => getGalleryURL(i));
    return d;
  })
  return data;
})();

export const fetchGallery = async () => {
  return await fetchGalleryI;
};
