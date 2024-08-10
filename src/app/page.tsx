import {
  Box,
  Card,
  Container,
  Heading,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";

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
        <Box width="100%" mt={6}>
          <Input type="text" placeholder="Judul...." />
          <Textarea mt={4} placeholder="Catatan...." />
        </Box>
        <Card width="100%" padding={3}>
          <Text textAlign="right">2022-20-20</Text>
          <Box mt={3}>
            <Heading size="md">Title</Heading>
            <Text mt={2}>Isi</Text>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}
