import { axios } from "@/lib/utils/axios-config";
import {
  CONDITION,
  DEVELOPMENT_URL,
  PRODUCTION_URL,
} from "@/lib/utils/constants";
import { GetAllNotesSchema, GetNoteSchema } from "@/lib/utils/graphql";
import { NoteProps } from "@/types";
import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";

type GetAllNotesProps = {
  data: {
    getAllNotes: NoteProps[];
  };
};

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const response: { data: GetAllNotesProps } = await axios.post(
    `${
      CONDITION === "development" ? DEVELOPMENT_URL : PRODUCTION_URL
    }/api/graphql`,
    {
      query: GetAllNotesSchema,
    }
  );

  return response.data.data.getAllNotes.map((item) => ({
    id: item.id.toString(),
  }));
}

type GetDetailNoteProps = {
  data: {
    getNote: NoteProps;
  };
};

async function getDetailNote(id: string): Promise<NoteProps> {
  const response: { data: GetDetailNoteProps } = await axios.post(
    `${
      CONDITION === "development" ? DEVELOPMENT_URL : PRODUCTION_URL
    }/api/graphql`,
    {
      query: GetNoteSchema(id),
    }
  );

  return response.data.data.getNote;
}

export default async function DetailNotePage({
  params,
}: {
  params: { id: string };
}) {
  const detailNote = (await getDetailNote(params.id)) as NoteProps;

  return (
    <Stack width="100%">
      <Flex justifyContent="space-between" width="100%" alignItems="center">
        <Link href="/">
          <Button>Back</Button>
        </Link>
        <Text fontWeight="semibold" textAlign="right">
          {format(detailNote.createdAt, "d MMMM y", {
            locale: id,
          })}
        </Text>
      </Flex>
      <Heading mt={6}>{detailNote.title}</Heading>
      <Text whiteSpace="pre-line" textAlign="justify" mt={4}>
        {detailNote.body}
      </Text>
    </Stack>
  );
}
