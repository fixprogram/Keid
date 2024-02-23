"use client";

import Layout from "@/widgets/Layout";
import { useQuery } from "@tanstack/react-query";
import React, { FC } from "react";
import InputText from "@/shared/ui/InputText";
import FilterBar from "@/shared/components/FilterBar";
import { List } from "@/shared/ui/List";
import Link from "next/link";
import Icon from "@/shared/ui/Icon";

async function getData() {
  const res = await fetch(`/api/search`);
  const data = await res.json();

  return data;
}

const FILTERS = ["User", "Project", "Task"];

export const Search: FC = () => {
  const { data } = useQuery({
    queryKey: ["search"],
    queryFn: getData,
  });

  return (
    <Layout isBottomGradientShowed={false}>
      <InputText type="search" name="search" placeholder="Search..." />

      <FilterBar
        filters={FILTERS}
        activeFilter={FILTERS[0]}
        filterClickHandler={() => {}}
      />

      {data ? (
        <List>
          {data.users.map((user: any) => (
            <Link href={`/profile/${user.id}`} key={user.id} className="block">
              <div className="flex gap-4">
                <div className="w-10">
                  <Icon name="avatar" width={40} height={40} />
                </div>

                <div className="flex gap-1">
                  <b className="font-bold text-sm text-white block">
                    {user.name}
                  </b>
                </div>
              </div>
            </Link>
          ))}
        </List>
      ) : null}
    </Layout>
  );
};
