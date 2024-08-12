"use client";

import { ChildrenProps } from "@/types";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Providers({ children }: ChildrenProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider>
        <ChakraProvider>
          <ColorModeScript />
          {children}
        </ChakraProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
}
