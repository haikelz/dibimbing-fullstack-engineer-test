"use client";

import { ChildrenProps } from "@/types";
import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import { Provider } from "jotai";

export default function Providers({ children }: ChildrenProps) {
  return (
    <Provider>
      <CacheProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </CacheProvider>
    </Provider>
  );
}
