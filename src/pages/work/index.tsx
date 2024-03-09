import type { GetStaticProps } from "next";
import { fetchData } from "../../lib/fetchData";
import { Box, Container, useTheme, useMediaQuery } from "@mui/material";
import Layout from "../../Layout";
import { Statement, CategoryColumn } from "../../components/Work";
import { Work as WorkData } from "../../types/strapi/Work";
import { GalleryManifest } from "../../types/gallery";
import { fetchGallery } from "../../lib/fetchGallery";
import { CSSProperties } from "@mui/material/styles/createMixins";

interface APICall {
  workData: WorkData;
  gallery: GalleryManifest[];
}

const Work = ({ workData, gallery }: APICall) => {
  const { title, subtitle } = workData.attributes;

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  const spanStyles = (): CSSProperties => ({
    textAlign: "center",
    margin: '3vh auto',
    display: 'block',
  })

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      minHeight="100vh"
      paddingTop="10vh"
      mt={isMd ? 0 : 14}
    >
      <Layout title="IsYourPhoto | Gallery">
        <Container maxWidth="lg">
          <Statement title={title} subtitle={subtitle} />
          <CategoryColumn category_data={gallery} />
          <span style={spanStyles()}>All information is automatically received from
            <a href="https://www.instagram.com/isyourphoto/" target="_blank" rel="noreferrer"> Instagram (IsYourPhoto, Ksyu)</a>
            , all rights are delegated
          </span>
        </Container>
      </Layout>
    </Box>
  );
};

export default Work;

export const getStaticProps: GetStaticProps = async () => {
  const workRes: { data: WorkData } = await fetchData("/work", {
    populate: {
      category_card: {
        //populate all relations in category_card level
        populate: "*",
      },
    },
  });
  return {
    props: {
      workData: workRes.data,
      gallery: await fetchGallery(),
    },
    revalidate: 300,
  };
};
