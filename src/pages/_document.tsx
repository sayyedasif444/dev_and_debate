import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/images/logo-main.png" sizes="any" />
        <link rel="icon" href="/images/logo-main.png" type="image/png" />
        <link rel="shortcut icon" href="/images/logo-main.png" />
        <link rel="apple-touch-icon" href="/images/logo-main.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
} 