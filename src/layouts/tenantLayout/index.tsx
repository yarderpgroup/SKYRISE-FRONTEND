import Head from "next/head";
import { useState } from "react";
import TenantDrawer from "./TenantDrawer";
import TenantNavbar from "./TenantNavbar";
import { useRouter } from "next/router";

type Props = {
  title?: string;
  children: JSX.Element[] | JSX.Element;
  headerText?: any;
};

export default function tenantLayout({
  title = "Welcome To Your Panel",
  headerText,
  children = <></>,
}: Props) {
  const [isExpand, setIsExpand] = useState(false);
  const router = useRouter();
  const propertyID: any = router.query.selectedId;
  console.log("Rakesh", router?.query);

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative h-full">
        <TenantDrawer isExpand={isExpand} setIsExpand={setIsExpand} />

        <section className={`w-full md:pl-16 h-screen overflow-y-scroll`}>
          <TenantNavbar
            setIsExpand={setIsExpand}
            headerText={headerText}
            propertyID={propertyID}
          />
          {children}
        </section>
      </main>
    </>
  );
}
