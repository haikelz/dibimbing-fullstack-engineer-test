import {
  CONDITION,
  DEVELOPMENT_URL,
  PRODUCTION_URL,
} from "@/lib/utils/constants";
import { GetAllNotesSchema, GetNoteSchema } from "@/lib/utils/graphql";
import { NoteProps } from "@/types";
import { Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Metadata } from "next";
import Link from "next/link";

type GetAllNotesProps = {
  data: {
    getAllNotes: NoteProps[];
  };
};

export async function generateStaticParams() {
  const response: { data: GetAllNotesProps } = await axios.post(
    `${
      CONDITION === "development" ? DEVELOPMENT_URL : PRODUCTION_URL
    }/api/graphql`,
    {
      query: GetAllNotesSchema,
    },
    { headers: { "Content-Type": "application/json" } }
  );

  return response.data.data.getAllNotes.map((item) => ({
    id: item.id.toString(),
  }));
}

async function getDetailNote(id: string): Promise<NoteProps> {
  const response: { data: GetDetailNoteProps } = await axios.post(
    `${
      CONDITION === "development" ? DEVELOPMENT_URL : PRODUCTION_URL
    }/api/graphql`,
    {
      query: GetNoteSchema(id),
    },
    { headers: { "Content-Type": "application/json" } }
  );

  return response.data.data.getNote;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata | undefined> {
  const { id } = params;

  const response = await getDetailNote(id);
  const { title, body, createdAt } = response;

  return {
    title,
    description: body,
    openGraph: {
      type: "article",
      url: `${PRODUCTION_URL}/notes/${id}`,
      title,
      description: body,
      publishedTime: createdAt,
      siteName: PRODUCTION_URL.replace("https://", ""),
    },
    twitter: {
      title,
      description: body,
      site: `${PRODUCTION_URL}/notes/${id}`,
      card: "summary_large_image",
    },
    metadataBase: new URL(`${PRODUCTION_URL}/notes/${id}`),
  };
}

type GetDetailNoteProps = {
  data: {
    getNote: NoteProps;
  };
};

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
