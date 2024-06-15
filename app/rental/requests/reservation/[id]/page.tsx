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
  Card,
  CardBody,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Reservation } from "@/app/interfaces";
import AcceptButton from "@/app/components/AcceptButton";
import RefuseButton from "@/app/components/RefuseButton";
// import AcceptButton from "@/app/components/AcceptButton";

const ReservationDetails = ({ params }: { params: { id: string } }) => {
  const id = +params.id;
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`/apis/reservedCars/${id}`);
        setReservation(response.data);
      } catch (err) {
        setError("Failed to fetch reservation details.");
      }
    };

    fetchReservations();
  }, []);

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!reservation) {
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
      <Card size="lg" >
        <CardBody p={{ base: 1, md: 4 }}>
          <Stack direction="column" spacing={4} align="center" display={"flex"}>
            <Image
              borderRadius="full"
              boxSize="100px"
              src={reservation.client.image_url || "https://bit.ly/dan-abramov"}
              alt={reservation.client.user.name}
            />
            <Heading>{reservation.client.user.name}</Heading>
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
                src={reservation.car.main_image_url}
                alt={reservation.car.brand}
              />
            </Box>
            <Box mt={4}>
              <Heading size="md">Reservation Details</Heading>
              <Table variant="simple" size="sm">
                <Tbody>
                  <Tr>
                    <Th>Reservation Date</Th>
                    <Td>{new Date(reservation.rental_date).toLocaleDateString()}</Td>
                  </Tr>
                  <Tr>
                    <Th>Reservation Time </Th>
                    <Td>{new Date(reservation.rental_date).toLocaleTimeString()}</Td>
                  </Tr>
                  <Tr>
                    <Th>Days</Th>
                    <Td>{reservation.days}</Td>
                  </Tr>
                  <Tr>
                    <Th>Model</Th>
                    <Td>{reservation.car.model}</Td>
                  </Tr>
                  <Tr>
                    <Th>Brand</Th>
                    <Td>{reservation.car.brand}</Td>
                  </Tr>
                  <Tr>
                    <Th>Year</Th>
                    <Td>{reservation.car.year}</Td>
                  </Tr>
                  <Tr>
                    <Th>Status</Th>
                    <Td>{reservation.status}</Td>
                  </Tr>
                </Tbody>
              </Table>
              {reservation.status == "IN_PROGRESS" && (
                <HStack mt={4} justifyContent={"center"}>
                  <AcceptButton id={reservation.id} used_for="reservation" />
                  <RefuseButton id={reservation.id} used_for={"reservation"} />
                </HStack>
              )}
              {reservation.status == "NOT_VERIFIED" && (
                <Alert status="error">
                  <AlertIcon />
                  Request refused
                </Alert>
              )}
              {reservation.status == "VERIFIED" && (
                <Alert status="success">
                  <AlertIcon />
                  Requesr Accepted
                </Alert>
              )}
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default ReservationDetails;
