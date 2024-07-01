"use client";
import {
  Table,
  Image,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Hide,
  Box,
  Grid,
  Text,
  Skeleton,
  Stack,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CurrentInterface } from "../interfaces";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UseCurrentUser } from "../hooks/useCurrentUser";

interface Props {
  userId: number;
  use_for: string;
}

const Current = ({ use_for, userId }: Props) => {
  const [current, setCurrent] = useState<CurrentInterface[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();
  const user = UseCurrentUser();

  const handleClick = (id: number) => {
    router.push(`/${use_for == "rental" ? "rental" : "user"}/current/${id}`);
  };

  const compare = (start_date: string, days: number): boolean => {
    const end = new Date(start_date);
    end.setDate(end.getDate() + days);
    const now = new Date();
    if (now < end) return true;
    return false;
  };

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const result = await axios.get(`/apis/current`);
        setCurrent(result.data);
      } catch (err) {
        setError("Something went wrong");
      }
    };

    fetchRentals();
  }, []);
  if (error) {
    return <p>{error}</p>;
  }

  let filterCurrent = current.filter((curr) =>
    compare(curr.rental_date.toString(), curr.days)
  );

  if (!filterCurrent.length)
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
            No Current Car Found!
          </AlertTitle>
        </Alert>
      </>
    );
  if (user)
    return (
      <>
        <Grid gap={6}>
          <>
            <Box overflowX="auto">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>{use_for == "rental" ? "Client" : "Rental"}</Th>
                    <Th>Car</Th>
                    <Hide below="md">
                      <Th>Date</Th>
                    </Hide>
                    <Th>Days</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {current.map((curr) =>
                    compare(curr.rental_date.toString(), curr.days) ? (
                      <Tr
                        key={curr.id}
                        onClick={() => handleClick(curr.id)}
                        _hover={{
                          textDecoration: "none",
                          bg: "gray.500",
                          cursor: "pointer",
                        }}
                        className=" ease-in-out cursor-pointer transform transition-colors duration-300"
                      >
                        <Td>
                          <Box display="flex" alignItems="center" gap={2}>
                            <Image
                              borderRadius="full"
                              boxSize="50px"
                              src={
                                (use_for == "rental"
                                  ? curr.client.image_url
                                  : curr.client.image_url) ||
                                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                              }
                              alt={curr.client.user.name}
                            />
                            <Text>{curr.client.user.name}</Text>
                          </Box>
                        </Td>
                        <Td>
                          {curr.car.brand} {curr.car.model}
                          {curr.car.year}
                        </Td>
                        <Hide below="md">
                          <Td>
                            <p>
                              {new Date(curr.rental_date).toLocaleDateString()}
                            </p>
                            {new Date(curr.rental_date).toLocaleTimeString()}
                          </Td>
                        </Hide>
                        <Td>{curr.days}</Td>
                      </Tr>
                    ) : null
                  )}
                </Tbody>
              </Table>
            </Box>
          </>
        </Grid>
      </>
    );
};

export default Current;
