/* eslint-env node */
import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Banner, Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";
import MarkdownOfficeIcon from "./icon/MarkdownOfficeIcon";
import { Twitter } from "../components/icons";

export const metadata = {
  metadataBase: new URL("https://markdownoffice.com"),
  title: {
    template: "%s - MarkdownOffice",
    default: "MarkdownOffice - LLM-first, markdown-native office suite with Git-friendly and free Self-host",
  },
  description:
    "MarkdownOffice: LLM-first markdown native office collaboration, and version control with fully self-hosted, auditable, and open by design",
  applicationName: "MarkdownOffice",
  generator: "MarkdownOffice v0.1.0",
  appleWebApp: {
    title: "MarkdownOffice",
  },
  other: {
    "msapplication-TileImage": "/ms-icon-144x144.png",
    "msapplication-TileColor": "#fff",
  },
  twitter: {
    site: "https://markdownoffice.com",
  },
};

export default async function RootLayout({ children }) {
  const navbar = (
    <Navbar
      logo={
        <div className="x:flex x:items-center x:gap-2">
          <MarkdownOfficeIcon style={{ width: 24, height: 24 }} />
          <b>MarkdownOffice</b>
        </div>
      }
      projectLink={"https://github.com/markdownoffice"}
      chatLink="https://x.com/MarkdownOffice"
      chatIcon={<Twitter />}
    />
  );
  const pageMap = await getPageMap();
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="apple-mobile-web-app-title" content="MarkdownOffice" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </Head>
      <body>
        <Layout
          banner={
            <Banner storageKey="MarkdownOffice">
              MarkdownOffice is coming soon
            </Banner>
          }
          navbar={navbar}
          footer={
            <Footer>MIT {new Date().getFullYear()} © MarkdownOffice.</Footer>
          }
          editLink="Edit this page on GitHub"
          docsRepositoryBase="https://github.com/markdownoffice/markdownoffice/blob/main/content"
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          pageMap={pageMap}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
