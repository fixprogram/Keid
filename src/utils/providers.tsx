"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
// import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

function Providers({ children }: React.PropsWithChildren) {
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
      {/* <PersistQueryClientProvider client={client} persistOptions={{ persister }}> */}
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
      {/* </PersistQueryClientProvider> */}
    </QueryClientProvider>
  );
}

export default Providers;
