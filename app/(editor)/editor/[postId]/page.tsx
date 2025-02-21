//page.tsx

import React from 'react';
import { notFound, redirect } from "next/navigation";
import { Post, User } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import EditorWrapper from 'app/(speech)/src/app/components/EditorWrapper.js';


async function getPostForUser(postId: Post["id"], userId: User["id"]) {
  return await db.post.findFirst({
    where: {
      id: postId,
      authorId: userId,
    },
  });
}

interface EditorPageProps {
  params: { postId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const post = await getPostForUser(params.postId, user.id);

  if (!post) {
    notFound();
  }

  return (
    <EditorWrapper post={{
      id: post.id,
      title: post.title,
      content: post.content,
      published: post.published,
    }} />
  );
}
