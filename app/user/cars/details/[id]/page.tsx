"use client";

import CarDetails from "@/app/components/CarDetails";
import { CarData } from "@/app/rental/cars/edit/[id]/page";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = ({ params }: { params: { id: string } }) => {
  const [car, setCar] = useState<CarData>();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`/apis/cars/${params.id}`); // Modify the URL as needed
        setCar(response.data); // Axios wraps the response data in a `data` object
      } catch (err) {
        // setError(err.message);
      }
    };

    fetchCar();
  }, []);
  if (car) return <CarDetails car={car} showed_for="user" />;
};

export default page;
