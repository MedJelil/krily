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
import { Rental } from "@/app/interfaces";
import CancelButton from "@/app/components/CancelButton";
import EditRentalButton from "@/app/components/EditRentalButton";
import Loader from "@/app/components/Loader";
import AdminActionsOnUsers from "@/app/components/AdminActionsOnUsers";

const RentalDetail = ({ params }: { params: { id: string } }) => {
  const id = +params.id;
  const [rental, setRental] = useState<Rental | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRental = async () => {
      try {
        const response = await axios.get(`/apis/rentals/${id}`);
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

  if (!rental && !error) return <Loader />;

  if (rental)
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
                src={
                  rental.image_url || "https://bit.ly/dan-abramov"
                }
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
                {/* <Image
                  borderRadius="md"
                  boxSize={{ sm: "sm", lg: "sm" }}
                  h={{ sm: "sm", lg: "300px" }}
                  src={rental.car.main_image_url}
                  alt={rental.car.brand}
                /> */}
              </Box>
              <Box mt={4}>
                <Heading size="md">Rental Details</Heading>
                <Table variant="simple" size="sm">
                  <Tbody>
                    <Tr>
                      <Th>registration Date</Th>
                      <Td>{new Date(rental.createdAt).toLocaleDateString()}</Td>
                    </Tr>
                    <Tr>
                      <Th>Nom </Th>
                      <Td>{rental.user.name}</Td>
                    </Tr>
                    <Tr>
                      <Th>Contact</Th>
                      <Td>{rental.user.phoneNumber}</Td>
                    </Tr>
                    <Tr>
                      <Th>Localisation</Th>
                      <Td>{rental.location}</Td>
                    </Tr>
                    <Tr>
                      <Th>status</Th>
                      <Td>{rental.status}</Td>
                    </Tr>
                    
                  </Tbody>
                </Table>
                <AdminActionsOnUsers id={rental.id} user="rental"/>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Box>
    );
};

export default RentalDetail;
