// this file involves the entire project, like de app file, but is loaded only once
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render()
  {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@500;600&display=swap" rel="stylesheet"/>
        </Head>
      <body>
        <Main/>
        <NextScript/>
      </body>
      </Html>
    );
  }
}