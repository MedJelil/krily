"use client";
import { SimpleGrid, Text } from "@chakra-ui/react";
import CarCard from "./CarCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { Car } from "../interfaces";
import prisma from "@/prisma/client";
import { UseCurrentUser } from "../hooks/useCurrentUser";

interface props {
  showed_for: string;
  query: string;
  currentPage: number;
}

const CarsGrid = ({ query, currentPage, showed_for }: props) => {
  const [cars, setCars] = useState<Car[]>();
  const [error, setError] = useState(null);
  const currentUser = UseCurrentUser();

  useEffect(() => {
    const fetchCars = async () => {
      const endPoint =
        showed_for == "rental"
          ? `cars/carByRental/${currentUser?.id}?query=${query}`
          : `cars?query=${query}`;
      try {
        const response = await axios.get(`/apis/${endPoint}`); // Modify the URL as needed
        setCars(response.data); // Axios wraps the response data in a `data` object
      } catch (err) {
        // setError(err.message);
      }
    };

    fetchCars();
  }, [query]);

  if (cars)
    return (
      <>
        {/* {error && <Text>{error}</Text>} */}
        <SimpleGrid
          spacing={4}
          columns={{ sm: 1, md: 2, lg: 4, xl: 5 }}
          padding={{ base: 2, md: 5 }}
        >
          {showed_for != "user" &&
            cars.map((car) => (
              <CarCard key={car.id} car={car} showed_for={showed_for} />
            ))}

          {showed_for == "user" &&
            cars.map((car) =>
              car.status == "VERIFIED" ? (
                <CarCard key={car.id} car={car} showed_for={showed_for} />
              ) : null
            )}
        </SimpleGrid>
      </>
    );
};

export default CarsGrid;
