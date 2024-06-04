"use client";
import { SimpleGrid, Text } from "@chakra-ui/react";
import CarCard from "./CarCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { CarData } from "../rental/cars/edit/[id]/page";

interface props {
  showed_for: string;
}

const CarsGrid = ({showed_for}: props) => {

  const [cars, setCars] = useState<CarData[]>();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("/apis/cars"); // Modify the URL as needed
        setCars(response.data); // Axios wraps the response data in a `data` object
      } catch (err) {
        // setError(err.message);
      }
    };

    fetchCars();
  }, []);

  if (cars)
    return (
      <>
        {/* {error && <Text>{error}</Text>} */}
        <SimpleGrid
          spacing={4}
          columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
          padding={10}
        >
          {cars.map((car) => (
            <CarCard key={car.id} car={car} showed_for={showed_for}/>
          ))}
        </SimpleGrid>
      </>
    );
};

export default CarsGrid;
