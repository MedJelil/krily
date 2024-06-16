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
import { Rental } from "../interfaces";
import { useRouter } from "next/navigation";

const Rentals = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleClick = (id: number) => {
    router.push(`/admin/users/rental/${id}`);
  };

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const response = await axios.get(`/apis/rentals`);
        setRentals(response.data);
      } catch (err) {
        setError("Something went wrong");
      }
    };

    fetchRentals();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!rentals.length) {
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
            <Th>client</Th>
            <Th>Contact</Th>
            <Th>status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {rentals.map((rental) => (
            <Tr
              key={rental.id}
              onClick={() => handleClick(rental.id)}
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
                    src={rental.image_url || "https://bit.ly/dan-abramov"}
                    alt={rental.user.name}
                  />
                  <Text>{rental.user.name}</Text>
                </Box>
              </Td>
              <Td fontSize={13}>
                {rental.user.phoneNumber}
              </Td>
              <Td fontSize={13}>
                {rental.status}
                
                </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Rentals;
