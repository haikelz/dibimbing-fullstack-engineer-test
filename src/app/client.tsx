"use client";

import IsError from "@/components/is-error";
import IsPending from "@/components/is-pending";
import { useFetch } from "@/hooks";
import { axios } from "@/lib/utils/axios-config";
import { editedNoteAtom } from "@/store";
import { NoteProps } from "@/types";
import {
  Box,
  Button,
  Card,
  Container,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useAtom } from "jotai";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function HomepageClient() {
  const [editedNote, setEditedNote] = useAtom(editedNoteAtom);

  const { data, isPending, isError, refetch } = useFetch("/api/notes");

  const {
    formState: { errors },
    register,
    getValues,
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      title: "",
      body: "",
    },
  });

  const queryClient = useQueryClient();

  async function postNote() {
    await axios.post("/api/notes", {
      title: getValues("title"),
      body: getValues("body"),
    });
  }

  const postNoteMutation = useMutation({
    mutationFn: postNote,
    onSettled: async () =>
      await queryClient.invalidateQueries({
        exact: true,
      }),
  });

  function onSubmit() {
    if (editedNote?.status) {
      editNoteMutation.mutateAsync(editedNote.id).then(() => {
        refetch();
        setEditedNote(null);
        setValue("title", "");
        setValue("body", "");
      });
    } else {
      postNoteMutation.mutateAsync().then(() => {
        refetch();
        setValue("title", "");
        setValue("body", "");
      });
    }
  }

  async function deleteNote(id: number) {
    await axios.delete(`/api/notes/${id}`);
  }

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSettled: async () =>
      await queryClient.invalidateQueries({
        exact: true,
      }),
  });

  function handleDelete(id: number) {
    deleteNoteMutation.mutateAsync(id).then(() => refetch());
  }

  async function editNote(id: number) {
    await axios.patch(`/api/notes/${id}`, {
      title: getValues("title"),
      body: getValues("body"),
    });
  }

  const editNoteMutation = useMutation({
    mutationFn: editNote,
    onSettled: async () =>
      await queryClient.invalidateQueries({
        exact: true,
      }),
  });

  function handleEdit(id: number, title: string, body: string) {
    setValue("title", title);
    setValue("body", body);
    setEditedNote({ id: id, status: true });
  }

  if (isPending) return <IsPending />;
  if (isError) return <IsError />;

  const note = data.result.rows as NoteProps[];

  return (
    <Stack width="100%">
      <Container>
        <Box width="100%">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              placeholder="Judul...."
              {...register("title", { required: true })}
            />
            <Text>{errors.title ? errors.title.message : ""}</Text>
            <Textarea
              mt={4}
              placeholder="Catatan...."
              {...register("body", { required: true })}
            />
            {errors.body ? errors.body.message : ""}
            <Button type="submit">Submit</Button>
          </form>
          {note.length
            ? note.map((item) => (
                <Card key={item.id} width="100%" padding={3}>
                  <Text textAlign="right">
                    {format(item.created_at, "d MMMM y", { locale: id })}
                  </Text>
                  <Box mt={3}>
                    <Heading size="md">{item.title}</Heading>
                    <Text mt={2}>{item.body}</Text>
                  </Box>
                  <Button
                    onClick={() => handleEdit(item.id, item.title, item.body)}
                  >
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(item.id)}>Delete</Button>
                  <Link href={`/notes/${item.id}`}>Detail</Link>
                </Card>
              ))
            : null}
        </Box>
      </Container>
    </Stack>
  );
}
