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
import { RentedCar } from "@/app/interfaces";
import CancelButton from "@/app/components/CancelButton";
import EditRentalButton from "@/app/components/EditRentalButton";

const RentalDetail = ({ params }: { params: { id: string } }) => {
  const id = +params.id;
  const [rental, setRental] = useState<RentedCar | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRental = async () => {
      try {
        const response = await axios.get(`/apis/rentedCars/${id}`);
        setRental(response.data);
      } catch (err) {
        setError("Failed to fetch Rental details.");
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
      <Card size="lg">
        <CardBody p={{ base: 1, md: 4 }}>
          <Stack direction="column" spacing={4} align="center" display={"flex"}>
            <Image
              borderRadius="full"
              boxSize="100px"
              src={
                rental.car.rental.image_url || "https://bit.ly/dan-abramov"
              }
              alt={rental.car.rental.user.name}
            />
            <Heading>{rental.client.user.name}</Heading>
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
                    <Td>
                      {new Date(rental.createdAt).toLocaleDateString()}
                    </Td>
                  </Tr>
                  <Tr>
                    <Th>Rental Time </Th>
                    <Td>
                      {new Date(rental.createdAt).toLocaleTimeString()}
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
                <>
                  <Alert status="info">
                    <AlertIcon />
                    Pending request
                  </Alert>
                  <Box display={"flex"} justifyContent={"end"} mt={1}>
                  <HStack mt={4} justifyContent={"center"}>
                    <CancelButton
                      id={rental.id}
                      used_for={"rental"}
                    />
                    <EditRentalButton id={rental.id} />
                    </HStack>

                  </Box>
                </>
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
        </CardBody>
      </Card>
    </Box>
  );
};

export default RentalDetail;
