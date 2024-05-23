"use client";
import { FormControl, FormLabel, HStack, Input } from "@chakra-ui/react";



// model          String
// brand          String
// gearBox        String
// fuel           String
// status         Status        @default(NOT_VERIFIED)
// main_image_url String
// image1_url     String
// image2_url     String
// silenders      Int
// color          String
// year           Int
// daily_price    Float
// rentalId       Int
// rental         Rental
const createCar = () => {
  return (
    <form>
      <HStack justifyContent={"space-between"} mb={5}>
      <FormControl width={'40%'}>
        <FormLabel>Model</FormLabel>
        <Input type="text" name="model"/>
      </FormControl>

      <FormControl width={'40%'}>
        <FormLabel>Email</FormLabel>
        <Input type="email" />
      </FormControl>
      </HStack>

      <HStack justifyContent={"space-between"} mb={5}>
      <FormControl width={'40%'}>
        <FormLabel>Email</FormLabel>
        <Input type="email" />
      </FormControl>

      <FormControl width={'40%'}>
        <FormLabel>Email</FormLabel>
        <Input type="email" />
      </FormControl>
      </HStack>

      <HStack justifyContent={"space-between"} mb={5}>
      <FormControl width={'40%'}>
        <FormLabel>Email</FormLabel>
        <Input type="email" />
      </FormControl>

      <FormControl width={'40%'}>
        <FormLabel>Email</FormLabel>
        <Input type="email" />
      </FormControl>
      </HStack>
    </form>
  );
};

export default createCar;
