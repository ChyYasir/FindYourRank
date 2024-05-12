import { Html, Head, Main, NextScript } from "next/document";
import { Analytics } from "@vercel/analytics/react";
// import App from "./_app.js";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-WR89C64DMP"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-WR89C64DMP');
            `,
          }}
        />
      </Head>

      <body>
        <Main />
        {/* <App /> */}
        <Analytics />
        <NextScript />
      </body>
    </Html>
  );
}
