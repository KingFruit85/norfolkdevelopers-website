import Layout from "./Layout";
import Link from "next/link";
import Head from "next/head";
import siteConfig from "../../../site.config";
import { slugify } from "../../lib/slugify";
import { dateFormat } from "../../lib/date-functions";
import TagList from "../TagList";

type Props = {
  frontMatter: any;
  children: any;
};

export default function PostTemplate({ frontMatter: post, children }: Props) {
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article className="article mt-8 lg:max-w-3xl mr-auto ml-auto">
        <header className="inset mb-12">
          <TagList tags={post.tags} />

          <h1 className="hashtag mt-2 mb-1 text-4xl md:text-5xl font-bold leading-tight">
            {post.title}
          </h1>
          {post.date && (
            <p className="block text-foreground-secondary font-bold">
              {dateFormat(new Date(post.date))}
            </p>
          )}
          {post.author && siteConfig.features.authorPages ? (
            <span className="block text-base text-gray-600">
              by{[" "]}
              {post.author.map((author: string, i: number) => (
                <span key={author}>
                  <Link href={`/author/${slugify(author)}`}>
                    <a className="underline">{author}</a>
                  </Link>
                  {i < post.author.length - 1 ? ", " : ""}
                </span>
              ))}
            </span>
          ) : null}
        </header>
        <div className="typography">{children}</div>
      </article>
    </Layout>
  );
}
