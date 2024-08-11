import { getData } from "@/hooks/use-fetch";
import {
  CONDITION,
  DEVELOPMENT_URL,
  PRODUCTION_URL,
} from "@/lib/utils/constants";
import { NoteProps } from "@/types";
import { Stack, Text } from "@chakra-ui/react";

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const response: { result: { rows: NoteProps[] } } = await getData(
    `${
      CONDITION === "development" ? DEVELOPMENT_URL : PRODUCTION_URL
    }/api/notes`
  );

  return response.result.rows.map((item) => ({
    id: item.id.toString(),
  }));
}

export default async function DetailNotePage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Stack>
      <Text>Detail Note {params.id}</Text>
      <Stack></Stack>
    </Stack>
  );
}
