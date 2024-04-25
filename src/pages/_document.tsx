import * as React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            rel="preload"
            href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
            as="style"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicons/favicon.ico" />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="/favicons/image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicons/favicon-16x16.png"
          />
          <link rel="manifest" href="/favicons/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/favicons/safari-pinned-tab.svg"
            color="#f7a047"
          />
          <link rel="manifest" href="/favicons/site.webmanifest" />

          <meta httpEquiv="ScreenOrientation" content="autoRotate:disabled" />
          <meta name="theme-color" content="#F6F4F1" />
          <meta name="msapplication-TileColor" content="#f7a047" />

        </Head>
        <body style={{ backgroundColor: "#F7F9FC", padding: 0, margin: 0 }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
