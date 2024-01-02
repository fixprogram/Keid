"use client";

import { Comments } from "@/features/Comments";
import Layout from "@/widgets/Layout";
import { useQuery } from "@tanstack/react-query";
import React, { FC } from "react";
import { TodoTitle } from "@/features/TodoTitle";
import { Description } from "@/features/Description";
import { TodoHeader } from "@/widgets/TodoHeader/ui/TodoHeader";

async function getData(id: string) {
  const res = await fetch(`/api/challenges/${id}`);
  const data = await res.json();

  return data;
}

interface ChallengePropsType {
  id: string;
}

export const Challenge: FC<ChallengePropsType> = ({ id }) => {
  const { data } = useQuery({
    queryKey: ["challenge", id],
    queryFn: () => getData(id),
  });

  const { title, style, comments, streak } = data;

  return (
    <Layout withNav={false} isBottomGradientShowed={false}>
      <TodoHeader style={style} progress={streak} todoType="habit" />

      <section className="flex flex-col grow">
        <TodoTitle initialTitle={title} todoType={"habit"} />

        <Description itemType="habit" initialValue="description" />

        <div className="mt-auto">
          <Comments comments={comments} itemType="habit" />
        </div>
      </section>
    </Layout>
  );
};
