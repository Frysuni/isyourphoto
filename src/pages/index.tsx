import React from "react";
import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import NoSsr from "@mui/material/NoSsr";
import Layout from "../Layout";
import { Welcome, Bio, PhotoModal } from "../components/Home";

const Home = () => {
  const [modalState, setModalState] = useState({ open: false, image: "" });

  useEffect(() => {
    const jarallaxInit = async () => {
      const jarallaxElems = document.querySelectorAll(".jarallax");
      if (!jarallaxElems || (jarallaxElems && jarallaxElems.length === 0)) {
        return;
      }

      const { jarallax } = await import("jarallax");
      jarallax(jarallaxElems, { speed: 0.2 });
    };

    jarallaxInit();
  }, []);

  const scrollTo = (id: string) => {
    setTimeout(() => {
      const element = document.querySelector(`#${id}`);
      if (!element) {
        return;
      }
      const htmlElement = element as HTMLElement;
      window.scrollTo({
        left: 0,
        top: htmlElement.offsetTop,
        behavior: "smooth",
      });
    }, 75);
  };

  const toggleModal = (image: string) => {
    setModalState((prevState) => ({
      open: !prevState.open,
      image: prevState.open ? "" : image,
    }));
  };

  const styles = (bgImg: string) => ({
    position: "absolute",
    objectFit: "cover",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    zIndex: -1,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundImage: `url(${bgImg})`,
    filter: "brightness(0.9)",
    backgroundColor: "#10100D",
  });

  return (
    <Layout colorInvert={true}>
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        bgcolor="rgba(0, 0, 0, 0.45)"
      >
        <Container maxWidth="lg">
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box sx={styles('/images/ksyu.jpeg')} />
            <Welcome />
            <Box>
              <NoSsr>
                <Box
                  component="svg"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="#fff"
                  width={{ xs: 30, sm: 35 }}
                  height={{ xs: 30, sm: 35 }}
                  onClick={() => scrollTo("bio")}
                  sx={{ cursor: "pointer" }}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </Box>
              </NoSsr>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box id="bio" minHeight="100vh" display="flex" alignItems="center">
      <Container>
        <Bio />
      </Container>
    </Box>

      <PhotoModal
        image={modalState.image}
        open={modalState.open}
        handleModalClose={() => toggleModal("")}
      />
    </Layout>
  );
};

export default Home;
