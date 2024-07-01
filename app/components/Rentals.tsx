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
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Rental } from "../interfaces";
import { useRouter } from "next/navigation";

interface Props {
  use_for: string;
}

const Rentals = ({ use_for }: Props) => {
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

  let filteredRentals = rentals.filter(
    (rental) => rental.status == "IN_PROGRESS"
  );

  // setClients(filteredRentals);
  if (!filteredRentals.length && use_for == "requests")
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
            <Th>rental</Th>
            <Th>Contact</Th>
            <Th>status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {(use_for != "requests" ? rentals : filteredRentals).map((rental) => (
            <Tr
              key={rental.id}
              onClick={() => handleClick(rental.user.id)}
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
                      rental.image_url ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    }
                    alt={rental.user.name}
                  />
                  <Text>{rental.user.name}</Text>
                </Box>
              </Td>
              <Td fontSize={13}>{rental.user.phoneNumber}</Td>
              <Td fontSize={13}>{rental.status}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Rentals;
