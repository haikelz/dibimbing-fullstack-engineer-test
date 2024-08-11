import { getData } from "@/hooks/use-fetch";
import {
  CONDITION,
  DEVELOPMENT_URL,
  PRODUCTION_URL,
} from "@/lib/utils/constants";
import { NoteProps } from "@/types";
import { Heading, Stack, Text } from "@chakra-ui/react";

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

async function getDetailNote(id: string): Promise<NoteProps> {
  const response: { result: { rows: NoteProps[] } } = await getData(
    `${
      CONDITION === "development" ? DEVELOPMENT_URL : PRODUCTION_URL
    }/api/notes/${id}`
  );

  return response.result.rows[0];
}

export default async function DetailNotePage({
  params,
}: {
  params: { id: string };
}) {
  const detailNote = (await getDetailNote(params.id)) as NoteProps;

  return (
    <Stack>
      <Heading>{detailNote.title}</Heading>
      <Text>{detailNote.body}</Text>
      <Stack></Stack>
    </Stack>
  );
}
