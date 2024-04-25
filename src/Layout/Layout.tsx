import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Box, AppBar, useScrollTrigger } from "@mui/material";
import TopBar from "./TopBar";
import NavDialog from "./NavDialog";
import Footer from "./Footer";

const PAGES = [
  { title: "Главная", path: "/" },
  { title: "Мои фотографии", path: "/work" },
  { title: "Хочу фотку!", path: 'https://t.me/bbymcqueen' }
];

const META = {
  title: "IsYourPhoto",
  description: "Ksyu - photographer",
  image: "/images/main-icon.png",
  type: "website",
};

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  colorInvert?: boolean;
}

const Layout = ({ children, title, colorInvert = false }: LayoutProps) => {
  const [openNavDialog, setOpenNavDialog] = useState<boolean>(false);
  const router = useRouter();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 38,
  });

  const handleClickOpen = () => {
    setOpenNavDialog(true);
  };

  const handleClose = () => {
    setOpenNavDialog(false);
  };

  return (
    <>
      <Head>
        <title>{title || META.title}</title>
      </Head>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <AppBar
          // position="sticky"
          sx={{
            transition: "background-color 0.7s, box-shadow 0.7s",
            boxShadow: trigger ? "0px 1px 5px -1px rgba(0, 0, 0, 0.2)" : "none",
            bgcolor: trigger ? "#F7F9FC" : "transparent",
          }}
        >
          <TopBar
            pages={PAGES}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            colorInvert={trigger ? false : colorInvert}
          />
        </AppBar>

        {/* navigation dialog menu for mobile view */}
        <NavDialog
          openNavDialog={openNavDialog}
          handleClose={handleClose}
          pages={PAGES}
        />

        <Box
          component="main"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          flexGrow={1}
        >
          {children}
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default Layout;
