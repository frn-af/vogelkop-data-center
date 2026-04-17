import { getPublishedArticles } from "@/data/news";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

export async function GET() {
  const articles = getPublishedArticles();

  const itemsXml = articles
    .map((article) => {
      const link = `${SITE_URL}/berita/${article.slug}`;
      const pubDate = new Date(article.publishedAt).toUTCString();
      return `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${link}</link>
      <description><![CDATA[${article.excerpt}]]></description>
      <pubDate>${pubDate}</pubDate>
      <guid isPermaLink="true">${link}</guid>
    </item>`;
    })
    .join("");

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}/berita</link>
    <description>Berita dan Pengumuman Resmi BBKSDA Papua Barat Daya</description>
    <language>id-ID</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/berita/rss.xml" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
