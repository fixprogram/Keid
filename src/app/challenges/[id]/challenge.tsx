"use client";

import { Comments } from "@/features/Comments";
import Layout from "@/widgets/Layout";
import { useQuery } from "@tanstack/react-query";
import React, { FC, useMemo } from "react";
import { TodoTitle } from "@/features/TodoTitle";
import { Description } from "@/features/Description";
import { TodoHeader } from "@/widgets/TodoHeader/ui/TodoHeader";
import Icon from "@/shared/ui/Icon";
import {
  MappedMember,
  transformChallenge,
} from "@/templates/DashboardPage/lib/transformChallenge";

// type MappedMember = Member & { name: string };

async function getData(id: string) {
  const res = await fetch(`/api/challenges/${id}`);
  const data = await res.json();

  return data;
}

interface ChallengePropsType {
  id: string;
  // userId: string;
}

export const Challenge: FC<ChallengePropsType> = ({ id }) => {
  // const userId = useNavigationStore((state) => state.userId);
  const { data } = useQuery({
    queryKey: ["challenge", id],
    queryFn: () => getData(id),
  });

  const transformedData = useMemo(() => {
    return transformChallenge({ data });
  }, [data]);

  const { title, style, comments, streak, repeats, description, members } =
    transformedData;
  const progress = Math.floor((streak / repeats) * 100);

  // const isCompletedForToday = getIsCompletedForToday(data)

  return (
    <Layout withNav={false} isBottomGradientShowed={false}>
      <TodoHeader style={style} progress={streak} todoType="challenge" />

      <section className="flex flex-col grow">
        <TodoTitle initialTitle={title} todoType={"challenge"} />

        <Description
          itemType="challenge"
          initialValue={description ? description : ""}
        />

        <div className=" mt-4">
          <div className="flex justify-between mb-2">
            <h3 className="font-poppins font-semibold text-xl text-white">
              Progress
            </h3>
            <p className="font-medium text-base text-white">
              {streak}/{repeats} is completed
            </p>
          </div>
          <div className="h-[12px] w-auto flex-grow bg-white rounded-[5px]">
            <div
              className="h-full"
              style={{
                background: "linear-gradient(90deg, #353843 0%, #181A20 100%)",
                borderRadius: "5px 2px 2px 5px",
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        <h3 className="font-poppins font-semibold text-xl text-white mt-8">
          Members progress
        </h3>
        {members.length ? (
          <div className="flex flex-col gap-4 mt-4">
            {members.map((member: MappedMember) => {
              const memberProgress = Math.floor(
                (member.streak / repeats) * 100
              );
              return (
                <div key={member.id} className="bg-background2 rounded-2xl p-4">
                  <div className={`flex  gap-4 `}>
                    <div className="w-8">
                      <Icon name="avatar" width={32} height={32} />
                    </div>

                    <b className="font-semibold text-lg text-white block">
                      {member.name}
                    </b>
                  </div>

                  <div className="h-[12px] w-auto flex-grow bg-white rounded-[5px] mt-6">
                    <div
                      className="h-full"
                      style={{
                        background:
                          "linear-gradient(90deg, #353843 0%, #181A20 100%)",
                        borderRadius: "5px 2px 2px 5px",
                        width: `${memberProgress}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}

        <div className="mt-auto">
          <Comments comments={comments} itemType="challenge" />
        </div>
      </section>
    </Layout>
  );
};