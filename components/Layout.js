import Head from "next/head";

function Layout(pageProps) {
  return (
    <>
      <Head>
        <title>mini player</title>
      </Head>
      <link rel="icon" href="/favicon.ico" />
      <div>{pageProps.children}</div>
    </>
  );
}

export default Layout;
