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

interface Props {
  car: CarData;
  showed_for: string;
}
const GameCard = ({ car, showed_for }: Props) => {
  return (
    <Link href={`/${showed_for}/cars/details/${car.id}`}>
      <Card maxW="sm" maxH="sm" overflow={"hidden"}>
        <Image
          src={getCroppedImageUrl(car.main_image_url)}
          alt={car.model}
          h="sm"
        />
        <CardBody px={1}>
          <Heading size="md" mb={1} >
            <span className="capitalize">{car.model} </span>{car.year}
          </Heading>
          <HStack justifyContent={"space-between"} mb={1}>
            <HStack>
              <Text>{showed_for == "user" && "Boit Vitess"}</Text>
              {showed_for == "rental" ? (
                <Text 
                  bg={
                    car.status == "BLOCKED"
                      ? "red"
                      : car.status == "IN_PROGRESS"
                      ? "yellowgreen"
                      : car.status == "NOT_VERIFIED"
                      ? "gray"
                      : "blue"
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
            <Text>{car.daily_price} MRU/jour</Text>
          </HStack>
        </CardBody>
      </Card>
    </Link>
  );
};

export default GameCard;
