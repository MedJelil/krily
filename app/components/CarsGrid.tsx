"use client";
import { SimpleGrid, Text } from "@chakra-ui/react";
import CarCard from "./CarCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { Car } from "../interfaces";
import prisma from "@/prisma/client";

interface props {
  showed_for: string;
  query: string;
  currentPage: number;
}

const CarsGrid = ({query, currentPage, showed_for}: props) => {

  const [cars, setCars] = useState<Car[]>();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`/apis/cars?query=${query}`); // Modify the URL as needed
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
          padding={{base: 2, md: 5}}
        >
          {cars.map((car) => (
            <CarCard key={car.id} car={car} showed_for={showed_for}/>
          ))}
        </SimpleGrid>
      </>
    );
};

export default CarsGrid;
