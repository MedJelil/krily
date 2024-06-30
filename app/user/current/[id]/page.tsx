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
import { CurrentInterface } from "@/app/interfaces";
import Loader from "@/app/components/Loader";
import Countdown from "@/app/components/CountDown";

const HistoryDetails = ({ params }: { params: { id: string } }) => {
  const id = +params.id;
  const [history, setHistory] = useState<CurrentInterface | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`/apis/current/${id}`);
        setHistory(response.data);
      } catch (err) {
        setError("Failed to fetch History details.");
      }
    };

    fetchHistory();
  }, []);

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!history && !error) return <Loader />;

  if (history)
    return (
      <Box
        p={4}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Countdown date={history.rental_date.toString()} days={history.days} />
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
                  history.car.rental.image_url || "https://bit.ly/dan-abramov"
                }
                alt={history.car.rental.user.name}
              />
              <Heading>{history.car.rental.user.name}</Heading>
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
                  src={history.car.main_image_url}
                  alt={history.car.brand}
                />
              </Box>
              <Box mt={4}>
                <Heading size="md">Rental Details</Heading>
                <Table variant="simple" size="sm">
                  <Tbody>
                    <Tr>
                      <Th>Rental Date</Th>
                      <Td>
                        {new Date(history.rental_date).toLocaleDateString()}
                      </Td>
                    </Tr>
                    <Tr>
                      <Th>Rental Time </Th>
                      <Td>
                        {new Date(history.rental_date).toLocaleTimeString()}
                      </Td>
                    </Tr>
                    <Tr>
                      <Th>Days</Th>
                      <Td>{history.days}</Td>
                    </Tr>
                    <Tr>
                      <Th>Model</Th>
                      <Td>{history.car.model}</Td>
                    </Tr>
                    <Tr>
                      <Th>Brand</Th>
                      <Td>{history.car.brand}</Td>
                    </Tr>
                    <Tr>
                      <Th>Year</Th>
                      <Td>{history.car.year}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Box>
    );
};

export default HistoryDetails;
