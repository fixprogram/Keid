"use client";

import { Comments } from "@/widgets/Comments";
import Layout from "@/widgets/Layout";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { TodoTitle } from "@/features/TodoTitle";
import { Description } from "@/features/Description";
import { TodoHeader } from "@/widgets/TodoHeader/ui/TodoHeader";
import { TodoPoints } from "@/features/TodoPoints";
import Icon from "@/shared/ui/Icon";
import { TodoMetrics } from "@/shared/ui/TodoMetrics";
import { TodoBody } from "@/shared/ui/TodoBody";
import { StreakCalendar } from "@/shared/ui/StreakCalendar";
import { useComplete } from "@/features/Complete/model/useComplete";
import { formatDate } from "@/shared/lib/utils/formatDate";
import { Comment, CommentType } from "@prisma/client";
import { MAX_WIDTH } from "@/shared/config/consts";

async function getData(id: string) {
  const res = await fetch(`/api/habits/${id}`);
  const data = await res.json();

  return data;
}

interface TaskPropType {
  id: string;
}

const isDesktop =
  typeof window !== "undefined" && window.innerWidth > MAX_WIDTH;

export default function Habit({ id }: TaskPropType) {
  const { data } = useQuery({
    queryKey: ["habit", id],
    queryFn: () => getData(id),
  });

  const completeHandler = useComplete("habit");

  const {
    title,
    style,
    comments,
    streak,
    points,
    repeats,
    completedDays,
    startedFrom,
  } = data;

  const isCompletedToday = completedDays.includes(formatDate(new Date()));
  // const startedFrom = comments.find(
  //   (comment: Comment) => comment.type === CommentType.STARTED
  // )?.time;

  return (
    <Layout withNav={false} isBottomGradientShowed={false}>
      <TodoHeader
        style={style}
        progress={streak}
        todoType="habit"
        isHabit
        points={points}
      />

      <section className="flex flex-col grow" style={{ paddingBottom: 80 }}>
        <div className="mt-8">
          <TodoTitle initialTitle={title} todoType={"habit"} />
        </div>

        <TodoMetrics
          metrics={[
            {
              iconName: "streak",
              name: "Streak",
              value: streak,
              valueColor: "#C25FFF",
            },
            { iconName: "goal", name: "Goal", value: repeats },
          ]}
        />

        <TodoBody
          tabs={["Overview", "Comments"]}
          tabsContent={{
            Overview: (
              <>
                <Description itemType="habit" initialValue="description" />
                <StreakCalendar
                  habitData={new Set(completedDays)}
                  startedFrom={new Date(Number(startedFrom))}
                  onDayClick={() => {}}
                />
              </>
            ),
            Comments: (
              <div className="mt-auto">
                <Comments comments={comments} itemType="habit" />
              </div>
            ),
          }}
        />
      </section>

      <div
        className="fixed h-[80px] bottom-0 left-0"
        style={{
          boxShadow: "0 -10px 19px 1px #181A20",
          backgroundColor: "#181A20",
          left: isDesktop ? "initial" : 0,
          right: isDesktop ? "initial" : 0,
          maxWidth: 406,
          margin: isDesktop ? 0 : "auto",
          marginLeft: isDesktop ? "-12px" : "auto",
        }}
      >
        <div
          className={`fixed  h-[60px] bottom-5 left-6 ${
            isCompletedToday ? "border border-deactive" : "bg-primary"
          } text-white`}
          style={{
            borderRadius: "40px",
            // width: "calc(100% - 48px)",
            left: isDesktop ? "initial" : 0,
            right: isDesktop ? "initial" : 0,
            width: "calc(100% - 48px)",
            maxWidth: 406,
            margin: isDesktop ? 0 : "auto",
            marginLeft: isDesktop ? "12px" : "auto",
          }}
        >
          <button
            className={`w-[50px] h-[50px] flex justify-center items-center rounded-full absolute bottom-[5px] ${
              isCompletedToday ? "right-[29px]" : "bg-white left-[29px]"
            } bottom-[25px]`}
            style={{
              left: !isCompletedToday ? 5 : "auto",
              right: isCompletedToday ? 5 : "auto",
            }}
            onClick={completeHandler}
            disabled={isCompletedToday}
          >
            <Icon
              name={`${isCompletedToday ? "completed" : "blue-check"}`}
              width={isCompletedToday ? 50 : 18}
              height={isCompletedToday ? 50 : 14}
            />
          </button>
          <b
            className="text-lg block text-center"
            style={{ lineHeight: "60px" }}
          >
            {isCompletedToday ? "Done For Today" : "Set As Done"}
          </b>
        </div>
      </div>
    </Layout>
  );
}
