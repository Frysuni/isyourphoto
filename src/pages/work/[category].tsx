import type { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { Box } from "@mui/system";
import ImageGallery from "../../components/Work/ImageGallery";
import { GalleryManifest } from "../../types/gallery";
import { fetchGallery } from "../../lib/fetchGallery";

interface APICall {
  singleCategory: GalleryManifest;
}

const PhotoGallery = ({ singleCategory }: APICall) => {
  const { images } = singleCategory;
  const photoList: {
    id: number;
    imageUrl: string;
    photographer: string;
    position: number;
    title: string;
  }[] = images.map((v, i) => ({
    id: i + 1,
    position: i + 1,
    photographer: singleCategory.date,
    title: singleCategory.caption,
    imageUrl: v,
  }));

  return (
    <>
      <Head>
        <title>{singleCategory.caption}</title>
      </Head>
      <Box bgcolor="#0c1212" height="100vh">
        <ImageGallery photoList={photoList} />
      </Box>
    </>
  );
};
export default PhotoGallery;

export const getStaticPaths: GetStaticPaths = async () => {
  const galleryManifest: GalleryManifest[] = await fetchGallery();

  return {
    paths: galleryManifest.map((category) => ({
      params: {
        category: category.code,
      },
    })),
    fallback: false,
  };
};

interface IParams extends ParsedUrlQuery {
  category: string;
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { category } = params as IParams;

  const galleryManifest: GalleryManifest[] = await fetchGallery();
  // console.log(galleryManifest.find(v => v.code == category))
  const ff = galleryManifest.find(v => v.code == category);

  return {
    props: {
      singleCategory: ff,
    },
    revalidate: 300,
  };
};
export const dynamic = 'error'