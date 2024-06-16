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
    Skeleton,
    Stack,
    Button,
  } from "@chakra-ui/react";
  import axios from "axios";
  import React, { useEffect, useState } from "react";
  import { Client } from "../interfaces";
  import { useRouter } from "next/navigation";
  
  const Clients = () => {
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
  
    if (!clients.length) {
      return (
        <>
          <Stack>
            <Skeleton height="30px" />
            <Skeleton height="30px" />
            <Skeleton height="30px" />
            <Skeleton height="30px" />
            <Skeleton height="30px" />
          </Stack>
        </>
      );
    }
  
    return (
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Rental</Th>
              <Th>Contact</Th>
              <Th>status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {clients.map((client) => (
              <Tr
                key={client.id}
                onClick={() => handleClick(client.id)}
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
                      src={client.image_url || "https://bit.ly/dan-abramov"}
                      alt={client.user.name}
                    />
                    <Text>{client.user.name}</Text>
                  </Box>
                </Td>
                <Td fontSize={13}>
                  {client.user.phoneNumber}
                </Td>
                <Td fontSize={13}>
                  {client.status}
                  
                  </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    );
  };
  
  export default Clients;
  