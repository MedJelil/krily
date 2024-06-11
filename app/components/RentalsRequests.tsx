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
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Rental } from "../interfaces";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RentalsRequests = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleClick = (id: number) => {
    router.push(`/rental/requests/rental/${id}`);
  };

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const response = await axios.get(`/apis/rentedCars`);
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
            <Th>User</Th>
            <Th>Car</Th>
            <Th>Days</Th>
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
                    boxSize="50px"
                    src={rental.user.image_url || "https://bit.ly/dan-abramov"}
                    alt={rental.user.name}
                  />
                  <Text>{rental.user.name}</Text>
                </Box>
              </Td>
              <Td>
                {rental.car.brand} {rental.car.model} {rental.car.year}
              </Td>
              <Td>{rental.days}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default RentalsRequests;
