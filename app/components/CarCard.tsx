import {
  Card,
  CardBody,
  Image,
  Heading,
  HStack,
  Text,
  Container,
} from "@chakra-ui/react";
import getCroppedImageUrl from "@/app/image-url";
import { CarData } from "../rental/cars/edit/[id]/page";
import { TbAutomaticGearbox, TbManualGearbox } from "react-icons/tb";
import Link from "next/link";
import { Car } from "../interfaces";

interface Props {
  car: Car;
  showed_for: string;
}
const carCard = ({ car, showed_for }: Props) => {
  return (
    <Link href={`/${showed_for}/cars/details/${car.id}`}>
      <Card maxW="sm" maxH="sm" overflow={"hidden"}>
        <Image
          src={getCroppedImageUrl(car.main_image_url)}
          alt={car.model}
          h="230px"
        />
        <CardBody px={1}>
          <Heading size="md" mb={1} >
            <span className="capitalize">{car.model} </span>{car.year}
          </Heading>
          <HStack justifyContent={"space-between"} mb={1}>
            <HStack>
              <Text>{showed_for == "user" && "Boit Vitess"}</Text>
              {showed_for != "user" ? (
                <Text 
                  bg={
                    car.status == "BLOCKED"
                      ? "#E53E3E"
                      : car.status == "IN_PROGRESS"
                      ? "yellowgreen"
                      : car.status == "NOT_VERIFIED"
                      ? "gray"
                      : "#3182CE"
                  }
                  borderRadius="lg"
                  p={1}
                >
                  {car.status}{" "}
                </Text>
              ) : car.gearBox == "auto" ? (
                <TbAutomaticGearbox />
              ) : (
                <TbManualGearbox />
              )}
            </HStack>
            {showed_for != "admin" && <Text>{car.daily_price} MRU/jour</Text>}
            {showed_for == "admin" && <Text>{car.rental.user.name}</Text>}
          </HStack>
        </CardBody>
      </Card>
    </Link>
  );
};

export default carCard;
