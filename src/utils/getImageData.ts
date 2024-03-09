import { getGalleryURL } from "../lib/fetchGallery";

export function getImageData(path: string): Promise<{ width: number, heigth: number }> {
  return new Promise(res => {
    const img = new Image();
    img.onload = function() {
      res({ width: img.width, heigth: img.height })
    }
    img.src = getGalleryURL(path);
  })
}