/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Script from 'next/script';

const YandexMetrica = () => {
  return (
    <Script
      id="_YandexMetrika"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(97131858, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true
          });
        `
      }}
    />
  );
};

export default YandexMetrica;
