import { Box, Container } from "@chakra-ui/react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import Providers from "./providers";

const ToggleDarkMode = dynamic(() => import("@/components/toggle-dark-mode"));

const inter = Inter({ subsets: ["latin"] });

const baseMetadata = {
  title: "Noted",
  description:
    "Transform Your Ideas Into Action – Your Ultimate Note-Taking Solution",
  url: "https://dibimbing-fullstack-engineer-test.vercel.app",
};

const { title, description, url } = baseMetadata;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: "website",
    url,
    title,
    description,
    siteName: "dibimbing-fullstack-engineer-test.vercel.app",
  },
  twitter: {
    title,
    description,
    site: url,
    card: "summary_large_image",
  },
  metadataBase: new URL(url),
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
          <ToggleDarkMode />
          <Box width="100%" p={4}>
            <Container
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDir="column"
              maxW="5xl"
            >
              {children}
            </Container>
          </Box>
        </Providers>
      </body>
    </html>
  );
}
