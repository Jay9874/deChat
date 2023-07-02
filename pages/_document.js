import { Html, Head, Main, NextScript } from 'next/document'
export default function Document () {
  return (
    <Html lang='en'>
      <Head>
      <title>deChat</title>
        <meta
          name='description'
          content='A new world of being social with decentralised, secured messages.'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script
          type='module'
          src='https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js'
        ></script>
        <script
          noModule
          src='https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js'
        ></script>
      </body>
    </Html>
  )
}

// export default MyDocument;
