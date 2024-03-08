import { Canvas, loadImage } from "@napi-rs/canvas";
import { readdirSync, statSync, writeFileSync } from "fs";

async function aa(path: string) {
  const image = await loadImage(path);
  const logo = await loadImage('./logo.png');

  const canvas = new Canvas(image.width, image.height);
  const ctx = canvas.getContext('2d');

  ctx.drawImage(image, 0, 0);

  ctx.globalAlpha = 0.5;
  ctx.drawImage(logo, (canvas.width  - logo.width) * 0.5, (canvas.height - logo.height) * 0.9);

  writeFileSync(path, canvas.toBuffer('image/webp'));
};

readdirSync('./storage').forEach(d => {
  if (!statSync(`./storage/${d}`).isDirectory()) return;
  readdirSync(`./storage/${d}`).forEach(f => {
    if (!statSync(`./storage/${d}/${f}`).isFile()) return;
    aa(`./storage/${d}/${f}`);
  });
});