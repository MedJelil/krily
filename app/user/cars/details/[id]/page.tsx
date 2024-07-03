"use client";

import CarDetails from "@/app/components/CarDetails";
import { UseCurrentUser } from "@/app/hooks/useCurrentUser";
import { Car } from "@/app/interfaces";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = ({ params }: { params: { id: string } }) => {
  const [car, setCar] = useState<Car>();
  const [error, setError] = useState(null);
  const [clientId, setClientId] = useState();
  const user = UseCurrentUser();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const client = await axios.get(`/apis/clients/${user?.id}`);
        const response = await axios.get(`/apis/cars/${params.id}`); // Modify the URL as needed
        setCar(response.data); // Axios wraps the response data in a `data` object
        setClientId(client.data.id); // Axios wraps the response data in a `data` object
      } catch (err) {
        // setError(err.message);
      }
    };

    fetchCar();
  }, []);
  if (car)
    return <CarDetails car={car} showed_for="user" clientId={clientId} />;
};

export default page;
