import { UserFeedResponseItemsItem } from "instagram-private-api";

export function extractImages(feedItem: UserFeedResponseItemsItem) {
  const images = feedItem.carousel_media!.map(media => {
    return {
      filename: `/${media.id.split('_')[0]}.webp`,
      url: media.image_versions2.candidates.sort((a, b) => a.height * a.width + b.height * b.width)[0].url,
    };
  });

  return images;
}