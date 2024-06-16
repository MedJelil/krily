"use client";
import {
  Box,
  Image,
  Heading,
  Text,
  Stack,
  Table,
  Tbody,
  Tr,
  Td,
  Th,
  Card,
  CardBody,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Client } from "@/app/interfaces";
import Loader from "@/app/components/Loader";
import AdminActionsOnUsers from "@/app/components/AdminActionsOnUsers";

const ClientDetail = ({ params }: { params: { id: string } }) => {
  const id = +params.id;
  const [client, setClient] = useState<Client | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await axios.get(`/apis/clients/${id}`);
        setClient(response.data);
      } catch (err) {
        setError("Failed to fetch Client details.");
      }
    };

    fetchClient();
  }, []);

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!client && !error) return <Loader />;

  if (client)
    return (
      <Box
        p={4}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Card size="lg">
          <CardBody p={{ base: 1, md: 4 }}>
            <Stack
              direction="column"
              spacing={4}
              align="center"
              display={"flex"}
            >
              <Image
                borderRadius="full"
                boxSize="100px"
                src={client.image_url || "https://bit.ly/dan-abramov"}
                alt={client.user?.name}
              />
              <Heading>{client.user?.name}</Heading>
            </Stack>
            <Stack
              direction={{ base: "column", md: "row" }}
              gap={4}
              justifyContent={"center"}
              alignItems={"start"}
            >
              <Box mt={4}>
                {client.image_url && (
                  <Image
                    borderRadius="md"
                    boxSize={{ sm: "sm", lg: "sm" }}
                    h={{ sm: "sm", lg: "300px" }}
                    src={client.image_url}
                    alt={client.user.name}
                  />
                )}
              </Box>
              <Box mt={4}>
                <Heading size="md">Client Details</Heading>
                <Table variant="simple" size="sm">
                  <Tbody>
                    <Tr>
                      <Th>registration Date</Th>
                      <Td>{new Date(client.createdAt).toLocaleDateString()}</Td>
                    </Tr>
                    <Tr>
                      <Th>Nom </Th>
                      <Td>{client.user?.name}</Td>
                    </Tr>
                    <Tr>
                      <Th>Contact</Th>
                      <Td>{client.user?.phoneNumber}</Td>
                    </Tr>
                    <Tr>
                      <Th>status</Th>
                      <Td>{client.status}</Td>
                    </Tr>
                  </Tbody>
                </Table>
                <AdminActionsOnUsers id={client.id} user="client" />
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Box>
    );
};

export default ClientDetail;
