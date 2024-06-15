"use client";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { RentedCar } from "../interfaces";

const reservedCarSchema = z.object({

  days: z
    .number()
    .int()
    .min(
      1,
      "Days must be at least 1 to indicate the car is reserved for at least one day."
    ),
});

type ReservationData = z.infer<typeof reservedCarSchema>;

interface Props {
  id: number;
}


const RentalPopup = ({ id }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [rentedCar, setRentedCar] = useState<RentedCar>();

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const toast = useToast();
  const router = useRouter();


  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ReservationData>({
    resolver: zodResolver(reservedCarSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      const result = await axios.put(`/apis/rentedCars/${id}`, {
        ...data,

      });
      if (result) {
        const showToast = () =>
          toast({
            title: "request updated",
            description: "your request has been updated successfully ",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        router.push("/user/requests");
        showToast();
      }
    } catch (error) {
      const showToast = () =>
        toast({
          title: "error loading",
          description: "something went wrong",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      showToast();
    }
    // console.log({
    //   ...data,
    //   rental_date: formatDateTime(data.rental_date),
    //   end_reservation_date: end_reservation_date(data.rental_date, data.days),
    //   userId: 1,
    //   carId: carId,
    // });
  };

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`/apis/rentedCars/${id}`);
        setRentedCar(response.data);
      } catch (err) {
        // setError(err.message);
      }
    };

    fetchCar();
  }, []);

  return (
    <>
      <Button onClick={onOpen}>Edit</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm your renting</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pb={6}>
              <FormControl mt={4}>
                <FormLabel>Days</FormLabel>
                <Input
                  type="number"
                  placeholder="Days"
                  defaultValue={rentedCar?.days}
                  {...register("days", { valueAsNumber: true })}
                />
                {errors.days && (
                  <p className="text-red-500">{errors.days.message}</p>
                )}
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default RentalPopup