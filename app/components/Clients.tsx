import {
  Image,
  Text,
  Box,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Client } from "../interfaces";
import { useRouter } from "next/navigation";

interface Props {
  use_for: string;
}

const Clients = ({ use_for }: Props) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleClick = (id: number) => {
    router.push(`/admin/users/client/${id}`);
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(`/apis/clients`);
        setClients(response.data);
      } catch (err) {
        setError("Something went wrong");
      }
    };

    fetchClients();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  let filteredClients = clients.filter(
    (client) => client.status == "IN_PROGRESS"
  );

  // setClients(filteredClients);
  if (!filteredClients.length && use_for == "requests")
    return (
      <>
        <Alert
          status="info"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            No Requests Found!
          </AlertTitle>
        </Alert>
      </>
    );

  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Client</Th>
            <Th>Contact</Th>
            <Th>status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {(use_for != "requests" ? clients : filteredClients).map((client) => (
            <Tr
              key={client.id}
              onClick={() => handleClick(client.user.id)}
              borderRadius="md"
              _hover={{
                textDecoration: "none",
                bg: "gray.500",
                cursor: "pointer",
              }}
              className=" rounded-lg ease-in-out cursor-pointer transform transition-colors duration-300 "
            >
              <Td>
                <Box display="flex" alignItems="center" gap={2}>
                  <Image
                    borderRadius="full"
                    boxSize="40px"
                    src={
                      client.image_url ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    }
                    alt={client.user.name}
                  />
                  <Text>{client.user.name}</Text>
                </Box>
              </Td>
              <Td fontSize={13}>{client.user.phoneNumber}</Td>
              <Td fontSize={13}>{client.status}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Clients;
