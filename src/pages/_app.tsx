import * as React from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "../theme";

const MyApp: React.FunctionComponent<AppProps> = (props) => {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default MyApp;
