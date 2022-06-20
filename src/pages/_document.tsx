// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ReactElement } from 'react'

class MyDocument extends Document {
  render(): ReactElement {
    return (
      <Html lang="pt-BR" dir="ltr">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700;800&display=swap"
            rel="stylesheet"
          />
          <meta name="color-scheme" content="dark light" />
          <meta
            name="theme-color"
            media="(prefers-color-scheme: light)"
            content="white"
          />
          <meta
            name="theme-color"
            media="(prefers-color-scheme: dark)"
            content="black"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
