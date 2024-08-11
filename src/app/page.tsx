import { Box, Heading, Text } from "@chakra-ui/react";
import HomepageClient from "./client";

export default function Homepage() {
  return (
    <>
      <Box width="100%" textAlign="center">
        <Heading as="h1" size="2xl">
          Noted
        </Heading>
        <Text mt={2}>
          Transform Your Ideas Into Action – Your Ultimate Note-Taking Solution
        </Text>
      </Box>
      <HomepageClient />
    </>
  );
}
