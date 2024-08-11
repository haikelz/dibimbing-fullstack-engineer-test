import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";
import { Box, Container } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Noted",
  description:
    "Transform Your Ideas Into Action – Your Ultimate Note-Taking Solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Box width="100%" padding={4}>
            <Container
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDir="column"
            >
              {children}
            </Container>
          </Box>
        </Providers>
      </body>
    </html>
  );
}
