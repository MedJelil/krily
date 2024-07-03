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
import { useTranslations } from "next-intl";

interface Props {
  car: Car;
  showed_for: string;
}
const carCard = ({ car, showed_for }: Props) => {
  const t = useTranslations("Index");
  return (
    <Link href={`/${showed_for}/cars/details/${car.id}`}>
      <Card maxW="sm" maxH="sm" overflow={"hidden"}>
        <Image
          src={getCroppedImageUrl(car.main_image_url)}
          alt={car.model}
          h="230px"
        />
        <CardBody px={1}>
          <HStack justifyContent={"space-between"}>
            <Heading size="md" mb={1}>
              <span className="capitalize">{car.model} </span>
              {car.year}
            </Heading>
            <Text>{showed_for == "user" && car.rental.user.name}</Text>
          </HStack>
          <HStack justifyContent={"space-between"} mb={1}>
            <HStack>
              <Text>{showed_for == "user" && t("Boit Vitess")}</Text>
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
            {showed_for != "admin" && (
              <Text>
                {car.daily_price} MRU/{t("jour")}
              </Text>
            )}
            {showed_for == "admin" && <Text>{car.rental.user.name}</Text>}
          </HStack>
        </CardBody>
      </Card>
    </Link>
  );
};

export default carCard;
