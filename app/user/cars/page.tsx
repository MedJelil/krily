// pages/cars.tsx
// "use client"
// import { GetServerSideProps } from 'next';

import CarsGrid from "@/app/components/CarsGrid";

const Cars = () => {
  return <CarsGrid showed_for="user" />;
};

export default Cars;
