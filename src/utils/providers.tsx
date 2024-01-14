"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

// import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
// import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 60 * 24,
          cacheTime: 1000 * 60 * 60 * 24,
        },
      },
    })
  );

  // const persister = createSyncStoragePersister({
  //   storage: typeof window !== "undefined" ? window.localStorage : undefined,
  // });

  return (
    <QueryClientProvider client={client}>
      <SessionProvider session={session}>
        {/* <UserProvider> */}
        {/* <PersistQueryClientProvider client={client} persistOptions={{ persister }}> */}
        {children}
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        {/* </PersistQueryClientProvider> */}
        {/* </UserProvider> */}
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default Providers;
