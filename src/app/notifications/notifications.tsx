"use client";

import FilterBar from "@/features/FilterBar";
import PageHeader from "@/features/PageHeader";
import { getDateString } from "@/shared/lib/utils/getDateString";
import Icon from "@/shared/ui/Icon";
import Layout from "@/widgets/Layout";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

async function getData() {
  const res = await fetch(`/api/notifications`);
  const data = await res.json();

  return data;
}

export const Notifications: FC = () => {
  const { data } = useQuery({
    queryKey: ["notifications"],
    queryFn: getData,
  });

  return (
    <Layout>
      <PageHeader title="Notifications" />

      <FilterBar
        filters={["All", "Reports"]}
        activeFilter="All"
        filterClickHandler={() => {}}
      />

      {data ? (
        data.map((notification: any) => {
          return (
            <div key={notification.date} className="flex flex-col">
              <div
                className="text-deactive mt-6"
                style={{ fontSize: "12px", lineHeight: "16px" }}
              >
                {notification.userName} shared his daily report
              </div>
              <div className="flex gap-5" style={{ marginTop: 20, gap: 20 }}>
                <div style={{ width: 48, height: 48 }}>
                  <Icon name="avatar" width={48} height={48} />
                </div>
                <div>
                  <div className="flex justify-between">
                    <b
                      className="text-white"
                      style={{
                        fontSize: "14px",
                        lineHeight: "24px",
                      }}
                    >
                      {notification.userName}
                    </b>
                    <b
                      className="text-deactive"
                      style={{
                        fontSize: "14px",
                        lineHeight: "24px",
                      }}
                    >
                      {getDateString(new Date(Number(notification.date)))}
                    </b>
                  </div>
                  <p
                    className="text-deactive"
                    style={{ fontSize: 13, lineHeight: "24px" }}
                  >
                    {notification.content}
                  </p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>No data</div>
      )}
    </Layout>
  );
};
