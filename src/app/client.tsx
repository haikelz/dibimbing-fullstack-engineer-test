"use client";

import IsError from "@/components/is-error";
import IsPending from "@/components/is-pending";
import { useFetch } from "@/hooks";
import { graphQLClient } from "@/hooks/use-fetch";
import {
  CONDITION,
  DEVELOPMENT_URL,
  PRODUCTION_URL,
} from "@/lib/utils/constants";
import {
  AddNoteSchema,
  DeleteNoteSchema,
  EditNoteSchema,
} from "@/lib/utils/graphql";
import { formNoteSchema } from "@/lib/utils/schemas";
import { editedNoteAtom } from "@/store";
import { NoteProps } from "@/types";
import {
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useAtom } from "jotai";
import Link from "next/link";
import { useForm } from "react-hook-form";

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
    resolver: zodResolver(formNoteSchema),
  });

  const { data, isPending, isError, refetch } = useFetch(
    `${
      CONDITION === "development" ? DEVELOPMENT_URL : PRODUCTION_URL
    }/api/graphql`
  );

  const addNoteMutation = useMutation({
    mutationFn: async () =>
      await graphQLClient.request(
        AddNoteSchema(getValues("title"), getValues("body"))
      ),
    onSettled: async () =>
      await queryClient.invalidateQueries({
        exact: true,
      }),
  });

  function onSubmit() {
    if (editedNote?.status) {
      editNoteMutation.mutateAsync().then(() => {
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
      addNoteMutation.mutateAsync().then(() => {
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

  const deleteNoteMutation = useMutation({
    mutationFn: async (id: string) =>
      await graphQLClient.request(DeleteNoteSchema(id)),
    onSettled: async () =>
      await queryClient.invalidateQueries({
        exact: true,
      }),
  });

  function handleDelete(id: number) {
    deleteNoteMutation.mutateAsync(id.toString()).then(() => {
      refetch();
      setEditedNote(null);
      setValue("body", "");
      setValue("title", "");
      toast({
        title: "Success!",
        description: "Catatan berhasil dihapus",
        status: "success",
      });
    });
  }

  const editNoteMutation = useMutation({
    mutationFn: async () =>
      await graphQLClient.request(
        EditNoteSchema(
          editedNote?.id.toString() as string,
          getValues("title"),
          getValues("body")
        )
      ),
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

  const note = data.getAllNotes as NoteProps[];

  return (
    <>
      <Stack width="100%">
        <Box width="100%" mt={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex
              justifyContent="center"
              alignItems="center"
              flexDir="column"
              flex={1}
              width="100%"
            >
              <Box width="100%">
                <Input
                  type="text"
                  placeholder="Judul...."
                  {...register("title", { required: true })}
                />
                <Text textAlign="left" mt={2}>
                  {errors.title ? errors.title.message : ""}
                </Text>
              </Box>
              <Box width="100%">
                <Textarea
                  mt={5}
                  placeholder="Catatan...."
                  {...register("body", { required: true })}
                  height={200}
                />
                <Text mt={2}>{errors.body ? errors.body.message : ""}</Text>
              </Box>
              <Button type="submit" mt={5}>
                {editedNote?.status ? "Edit Catatan" : "Tambah Catatan"}
              </Button>
            </Flex>
          </form>
          <Box width="100%" mt={10}>
            <Heading as="h2" size="md">
              Daftar Catatan
            </Heading>
            <SimpleGrid
              gap={6}
              gridTemplateRows="repeat(1, minmax(0, 1fr))"
              gridTemplateColumns="repeat(3, minmax(0, 1fr))"
              width="100%"
              mt={3}
            >
              {note.length ? (
                note.map((item) => (
                  <Card key={item.id} width="100%" padding={3}>
                    <VStack height="100%" spacing="20px" width="100%">
                      <Box width="100%" textAlign="right">
                        <p>
                          {format(new Date(), "d MMMM y", {
                            locale: id,
                          })}
                        </p>
                      </Box>
                      <Box width="100%">
                        <Link href={`/notes/${item.id}`}>
                          <Heading size="md">{item.title}</Heading>
                          <Text
                            whiteSpace="pre-line"
                            noOfLines={3}
                            textAlign="justify"
                            mt={2}
                          >
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
              ) : (
                <Text
                  mt={4}
                  textDecoration="underline"
                  fontWeight="semibold"
                  textUnderlineOffset={4}
                >
                  Tidak ada catatan!
                </Text>
              )}
            </SimpleGrid>
          </Box>
        </Box>
      </Stack>
    </>
  );
}
