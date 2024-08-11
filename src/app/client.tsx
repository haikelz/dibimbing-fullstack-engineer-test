"use client";

import IsError from "@/components/is-error";
import IsPending from "@/components/is-pending";
import { useFetch } from "@/hooks";
import { axios } from "@/lib/utils/axios-config";
import { editedNoteAtom } from "@/store";
import { NoteProps } from "@/types";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Heading,
  IconButton,
  Input,
  Stack,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useAtom } from "jotai";
import Link from "next/link";
import { useForm } from "react-hook-form";
import htmr from "htmr";

export default function HomepageClient() {
  const [editedNote, setEditedNote] = useAtom(editedNoteAtom);

  const toast = useToast({
    duration: 5000,
    isClosable: true,
    position: "top-right",
  });

  const queryClient = useQueryClient();

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

  const { data, isPending, isError, refetch } = useFetch("/api/notes");

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
        toast({
          title: "Success!",
          description: "Catatan berhasil diedit",
          status: "success",
        });
      });
    } else {
      postNoteMutation.mutateAsync().then(() => {
        refetch();
        setValue("title", "");
        setValue("body", "");
        toast({
          title: "Success!",
          description: "Catatan berhasil ditambahkan",
          status: "success",
        });
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
    deleteNoteMutation.mutateAsync(id).then(() => {
      refetch();
      toast({
        title: "Success!",
        description: "Catatan berhasil dihapus",
        status: "success",
      });
    });
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
      <Box width="100%" mt={6}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex
            justifyContent="center"
            alignItems="center"
            flexDir="column"
            flex={1}
          >
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
            <Button type="submit" mt={4}>
              Submit
            </Button>
          </Flex>
        </form>
        <VStack spacing="1.5rem" width="100%" mt={6}>
          {note.length
            ? note.map((item) => (
                <Card key={item.id} width="100%" padding={3}>
                  <VStack spacing="20px" width="100%">
                    <Text textAlign="right" fontWeight="medium">
                      {format(item.created_at, "d MMMM y", { locale: id })}
                    </Text>
                    <Box width="100%">
                      <Link href={`/notes/${item.id}`}>
                        <Heading size="md">{item.title}</Heading>
                        <Text textAlign="justify" mt={2}>
                          {item.body}
                        </Text>
                      </Link>
                    </Box>
                    <HStack spacing="15px" width="100%">
                      <Button
                        aria-label="edit"
                        onClick={() =>
                          handleEdit(item.id, item.title, item.body)
                        }
                        width="100%"
                      >
                        Edit
                      </Button>
                      <Button
                        aria-label="delete"
                        colorScheme="red"
                        onClick={() => handleDelete(item.id)}
                        width="100%"
                      >
                        Delete
                      </Button>
                    </HStack>
                  </VStack>
                </Card>
              ))
            : null}
        </VStack>
      </Box>
    </Stack>
  );
}
