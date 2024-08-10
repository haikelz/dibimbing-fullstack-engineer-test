import { Box, Container, Heading, Text } from "@chakra-ui/react";
import HomepageClient from "./client";

export default function Homepage() {
  return (
    <Box width="100%" padding={4}>
      <Container
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
      >
        <Box width="100%" textAlign="center">
          <Heading>Noted</Heading>
          <Text>
            Transform Your Ideas Into Action – Your Ultimate Note-Taking
            Solution
          </Text>
        </Box>
        <HomepageClient />
      </Container>
    </Box>
  );
}
