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
        <div className="flex justify-center w-full">
          <div className="md:w-[850px] w-full">
            <Card size="lg">
              <CardBody p={{ base: 1, md: 8 }}>
                <Stack
                  direction={{ base: "column", md: "row" }}
                  spacing={4}
                  align={{ base: "start", md: "center" }}
                  display={"flex"}
                >
                  <div className="sm:w-1/2 w-full flex justify-center">
                    <Image
                      borderRadius="full"
                      boxSize="150px"
                      src={client.image_url || "https://bit.ly/dan-abramov"}
                      alt={client.user?.name}
                    />
                  </div>
                  <div className="sm:w-1/2 w-full">
                    <Box mt={4}>
                      <Heading size="md">Client Details</Heading>
                      <Table variant="simple" size="sm">
                        <Tbody>
                          <Tr>
                            <Th>registration Date</Th>
                            <Td>
                              {new Date(client.createdAt).toLocaleDateString()}
                            </Td>
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
                      {/* <AdminActionsOnUsers id={client.id} user="client" /> */}
                    </Box>
                  </div>
                </Stack>
                <Stack
                  display={"flex"}
                  direction={{ base: "column", md: "row" }}
                  gap={4}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  className="mt-12"
                >
                  <div className="w-full sm:w-1/2">
                    <Image
                      borderRadius="4"
                      boxSize="w-full"
                      src={
                        client.image_url ||
                        "https://res.cloudinary.com/de8he2kd8/image/upload/v1716460200/samples/cloudinary-group.jpg"
                      }
                      alt={client.user?.name}
                    />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <Image
                      borderRadius="4"
                      boxSize="w-full"
                      src={
                        client.image_url ||
                        "https://res.cloudinary.com/de8he2kd8/image/upload/v1716460200/samples/cloudinary-group.jpg"
                      }
                      alt={client.user?.name}
                    />
                  </div>
                </Stack>
                <div className="mt-6">
                  <AdminActionsOnUsers id={client.id} user="client" />
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </Box>
    );
};

export default ClientDetail;
