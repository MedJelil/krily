"use client";
import { Stat, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart } from "./FirstChart";

interface Props {
  use_for: string;
  userId: number;
}

const Charts = ({ use_for, userId }: Props) => {
  const [data, setData] = useState([]);
  const [reservedData, setReservedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTopRentedCars() {
      try {
        const response = await axios.get(
          `/apis/topRentedCars${use_for == "admin" ? "/" : "/" + userId}`
        );
        const reservedCarsData = await axios.get(
          `/apis/topReservedCars${use_for == "admin" ? "/" : "/" + userId}`
        );
        setData(response.data);
        setReservedData(reservedCarsData.data);
      } catch (error) {
        console.error("Error fetching the top rented cars data", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTopRentedCars();
  }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="grid gap-8 md:grid-cols-2 grid-cols-1 md:mx-16 mx-2 ">
      <div>
        <Stat
          px={{ base: 2, md: 4 }}
          py={"5"}
          shadow={"xl"}
          border={"1px solid"}
          borderColor={useColorModeValue("gray.100", "gray.500")}
          rounded={"lg"}
        >
          <h1 className="text-xl text-center mb-6">Top rented cars</h1>
          <BarChart data={data} title="Top cars" />
        </Stat>
      </div>
      <div>
        <Stat
          px={{ base: 2, md: 4 }}
          py={"5"}
          shadow={"xl"}
          border={"1px solid"}
          borderColor={useColorModeValue("gray.100", "gray.500")}
          rounded={"lg"}
        >
          <h1 className="text-xl text-center mb-6">Top reserved cars</h1>
          <BarChart data={reservedData} title="Top cars" />
        </Stat>
      </div>
    </div>
  );
};

export default Charts;
