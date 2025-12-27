/* eslint-env node */
import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Banner, Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";
import MarkdownOfficeIcon from "./icon/MarkdownOfficeIcon";

export const metadata = {
  metadataBase: new URL("https://markdownoffice.com"),
  title: {
    template: "%s - MarkdownOffice",
    default: "MarkdownOffice",
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
        <div className="flex gap-2 flex-col items-center sm:flex-row sm:items-center">
          <span>
          <MarkdownOfficeIcon style={{ width: 24, height: 24, marginRight: 8 }} />
          </span>
          <b>MarkdownOffice</b>{" "}
        </div>
      }
      // Next.js discord server
      chatLink="https://discord.gg/hEM84NMkRv"
    />
  );
  const pageMap = await getPageMap();
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head faviconGlyph="✦">
        <link
          rel="icon"
          type="image/png"
          href="/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </Head>
      <body>
        <Layout
          banner={<Banner storageKey="Nextra 2">Nextra 2 Alpha</Banner>}
          navbar={navbar}
          footer={<Footer>MIT {new Date().getFullYear()} © Nextra.</Footer>}
          editLink="Edit this page on GitHub"
          docsRepositoryBase="https://github.com/shuding/nextra/blob/main/examples/docs"
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          pageMap={pageMap}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
