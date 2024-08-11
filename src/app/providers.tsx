"use client";

import { ChildrenProps } from "@/types";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";

export default function Providers({ children }: ChildrenProps) {
  const queryClient = new QueryClient();

  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <CacheProvider>
          <ChakraProvider>
            <ColorModeScript />
            {children}
          </ChakraProvider>
        </CacheProvider>
      </QueryClientProvider>
    </Provider>
  );
}
