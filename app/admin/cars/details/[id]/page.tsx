"use client";

import CarDetails from "@/app/components/CarDetails";
import Loader from "@/app/components/Loader";
import { CarData } from "@/app/rental/cars/edit/[id]/page";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = ({ params }: { params: { id: string } }) => {
  const [car, setCar] = useState<CarData>();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`/apis/cars/${params.id}`); // Modify the URL as needed
        setCar(response.data); // Axios wraps the response data in a `data` object
      } catch (err) {
        setError("error");
      }
    };

    fetchCar();
  }, []);
  if (!car && !error) return <Loader />;

  if (error)
    return (
      <>
        <Alert
          status="error"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            No results found
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            Sorry we don't find result maybe there is a problem on the server
            please try again.
          </AlertDescription>
        </Alert>
      </>
    );
  else if (car) return <CarDetails car={car} showed_for="admin" />;
};

export default page;
