export const getGalleryURL = (path: string) => {
  const url = `${process.env.NEXT_PUBLIC_GALLERY_URL}${path}`
  return url;
};

const getGallery = async () => {
  const response = await fetch(
    getGalleryURL('manifest.json'),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).catch(e => e);

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
};

let gallery = getGallery();
setInterval(() => gallery = getGallery(), 53_000);

export const fetchGallery = async (): Promise<GalleryManifest[]> => {
  return await gallery;
};

export interface GalleryManifest {
  caption: string,
  date: string,
  code: string,
  images: string[]
}
