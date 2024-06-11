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
  HStack,
  Th,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Reservation } from "@/app/interfaces";
import AcceptButton from "@/app/components/AcceptButton";
import RefuseButton from "@/app/components/RefuseButton";
// import AcceptButton from "@/app/components/AcceptButton";

const RentalDetail = ({ params }: { params: { id: string } }) => {
  const id = +params.id;
  const [rental, setRental] = useState<Reservation | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRental = async () => {
      try {
        const response = await axios.get(`/apis/reservedCars/${id}`);
        setRental(response.data);
      } catch (err) {
        setError("Failed to fetch rental details.");
      }
    };

    fetchRental();
  }, []);

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!rental) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box
      p={4}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack direction="column" spacing={4} align="center" display={"flex"}>
        <Image
          borderRadius="full"
          boxSize="100px"
          src={rental.user.image_url || "https://bit.ly/dan-abramov"}
          alt={rental.user.name}
        />
        <Heading>{rental.user.name}</Heading>
      </Stack>
      <Stack
        direction={{ base: "column", md: "row" }}
        gap={4}
        justifyContent={"center"}
        alignItems={"start"}
      >
        <Box mt={4}>
          <Image
            borderRadius="md"
            boxSize={{ sm: "sm", lg: "sm" }}
            h={{ sm: "sm", lg: "300px" }}
            src={rental.car.main_image_url}
            alt={rental.car.brand}
          />
        </Box>
        <Box mt={4}>
          <Heading size="md">Rental Details</Heading>
          <Table variant="simple" size="sm">
            <Tbody>
              <Tr>
                <Th>Rental Date</Th>
                <Td>{new Date(rental.rental_date).toLocaleDateString()}</Td>
              </Tr>
              <Tr>
                <Th>Rental Time </Th>
                <Td>
                  {new Date(rental.rental_date).toLocaleTimeString()}
                </Td>
              </Tr>
              <Tr>
                <Th>Days</Th>
                <Td>{rental.days}</Td>
              </Tr>
              <Tr>
                <Th>Model</Th>
                <Td>{rental.car.model}</Td>
              </Tr>
              <Tr>
                <Th>Brand</Th>
                <Td>{rental.car.brand}</Td>
              </Tr>
              <Tr>
                <Th>Year</Th>
                <Td>{rental.car.year}</Td>
              </Tr>
              <Tr>
                <Th>Status</Th>
                <Td>{rental.status}</Td>
              </Tr>
            </Tbody>
          </Table>
          {rental.status == "IN_PROGRESS" && (
            <HStack mt={4} justifyContent={"center"}>
              <AcceptButton id={rental.id} used_for="reservation" />
              <RefuseButton id={rental.id} used_for={"reservation"} />
            </HStack>
          )}
          {rental.status == "NOT_VERIFIED" && (
            <Alert status="error">
              <AlertIcon />
              Request refused
            </Alert>
          )}
          {rental.status == "VERIFIED" && (
            <Alert status="success">
              <AlertIcon />
              Requesr Accepted
            </Alert>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default RentalDetail;
