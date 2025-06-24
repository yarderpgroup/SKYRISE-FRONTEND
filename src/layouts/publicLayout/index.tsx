import Head from "next/head";
import Footer from "./Footer";
import Navbar from "./Navbar";

type Props = {
  children: JSX.Element[] | JSX.Element;

  title?: string;
  description?: string;
  ogImage?: string;
};
export default function PublicLayout({
  children,
  title,
  description,
  ogImage,
}: Props) {
  return (
    <main>
      <Head>
        <meta property="og:url" content="" />
        <meta property="og:type" content="website" />
        <title>{title}</title>
        <meta
          name="description"
          content={description || "The Real Estate Company"}
        />
        <meta property="og:image" content={ogImage} />
      </Head>
      <Navbar />
      {children}

      <Footer />
    </main>
  );
}
