import { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import BlogDetails from "../BlogDetails";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const blog = await prisma.blog.findUnique({
    where: { id },
  });

  if (!blog) return { title: "Blog Not Found - Catholic Diocese of Katsina" };

  const siteUrl = "https://catholicdioceseofkatsina.org/blog/" + blog.id;

  return {
    title: `${blog.title} | Catholic Diocese of Katsina Blog`,
    description: blog.content.slice(0, 160), // meta description (trimmed)
    openGraph: {
      title: blog.title,
      description: blog.content.slice(0, 160),
      url: siteUrl,
      type: "article",
      publishedTime: blog.date.toISOString(),
      images: [
        {
          url: blog.image,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.content.slice(0, 160),
      images: [blog.image],
    },
    alternates: {
      canonical: siteUrl,
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = await prisma.blog.findUnique({
    where: { id },
  });

  if (!blog) return notFound();

  return <BlogDetails blog={blog} />;
}
