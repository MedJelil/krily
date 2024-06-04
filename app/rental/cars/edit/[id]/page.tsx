import CarForm from '@/app/components/CarForm'
import prisma from '@/prisma/client';
import React, { useState } from 'react'



export interface CarData {
    id: number;
    model: string;
    brand: string;
    gearBox: string;
    fuel: string;
    status: string;
    main_image_url: string;
    image1_url: string;
    image2_url: string;
    silenders: number;
    color: string;
    year: number;
    daily_price: number;
    rentalId: number;
  }


const EditCar = async ({ params }: { params: { id: string } }) => {
  const car = await prisma.car.findUnique({
    where: { id: Number(params.id) },
  });

  if(car){
  const carData = {
    id : car.id,
    model: car.model,
    brand: car.brand,
    gearBox: car.gearBox,
    fuel: car.fuel,
    status: car.status,
    main_image_url: car.main_image_url, 
    image1_url: car.image1_url,
    image2_url: car.image2_url,
    silenders: car.silenders,
    color: car.color,
    year: car.year,
    daily_price: car.daily_price,
    rentalId: car.rentalId
  }

  return (
    <CarForm carData={ carData }/>
  )}
}

export default EditCar