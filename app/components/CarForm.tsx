// pages/car-info.tsx
"use client";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Image,
  Grid,
  GridItem,
  Spinner,
  useToast,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { UseCurrentUser } from "../hooks/useCurrentUser";

const carSchema = z.object({
  model: z.string().min(1, "Model name is required."),
  brand: z.string().min(1, "Brand name is required."),
  gearBox: z.enum(["manuel", "auto"]),
  fuel: z.enum(["gazoil", "essence"]),
  // fuel: z.string().min(1, "Fuel type is required."),
  main_image_url: z.string().url("Main image is required."),
  image1_url: z.string().optional(),
  image2_url: z.string().optional(),
  silenders: z.number().int().min(1, "Sylinder count must be at least 1."),
  color: z.string().min(1, "Car color is required."),
  year: z
    .number()
    .int()
    .min(1900, "Year must be after 1900.")
    .max(new Date().getFullYear(), "Year cannot be in the future."),
  daily_price: z.number().min(0, "Daily price must be a non-negative number."),
  // rentalId: z.number().int().min(1, "Rental ID is required."),
});

type CarFormData = z.infer<typeof carSchema>;

interface cloudinaryResult {
  secure_url: string;
}

interface props {
  carData?: {
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
  };
}
const CarForm = ({ carData }: props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CarFormData>({
    resolver: zodResolver(carSchema),
  });

  const [uploading, setUploading] = useState(false);
  const [main_image, setMain_image] = useState(carData?.main_image_url || "");
  const [image_1, setImage_1] = useState(carData?.image1_url || "");
  const [image_2, setImage_2] = useState(carData?.image2_url || "");

  const handleUpload = (url: string, field: keyof CarFormData) => {
    setValue(field, url);
    setUploading(false);
    field == "main_image_url"
      ? setMain_image(url)
      : field == "image1_url"
      ? setImage_1(url)
      : setImage_2(url);
  };

  const router = useRouter();
  const [isSubmiting, setSubmiting] = useState(false);
  const toast = useToast();
  const user = UseCurrentUser();

  const onSubmit = async (data: FieldValues) => {
    if (carData) {
      // console.log(carData);
      if (user)
        try {
          setSubmiting(true);
          const result = await axios.put(`/apis/cars/${carData.id}`, {
            ...data,
            rentalId: +user.id,
          });
          if (result) {
            const showToast = () =>
              toast({
                title: "Car updated succesfuly.",
                description: "We've update your car for you.",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
            router.push(`/rental/cars/details/${carData.id}`);
            showToast();
          }
        } catch (error) {
          setSubmiting(false);
        }
    } else {
      if (user)
        try {
          setSubmiting(true);
          const result = await axios.post("/apis/cars", {
            ...data,
            rentalId: +user.id,
          });
          if (result) {
            const showToast = () =>
              toast({
                title: "Car created succesfuly.",
                description: "We've created your car for you.",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
            router.push("/rental/cars");
            showToast();
          }
        } catch (error) {
          setSubmiting(false);
        }
    }
  };

  return (
    <Box minW={{ base: "sm", md: "md", lg: "lg" }} mx="auto" mt={8} p={2}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={4}>
          <GridItem>
            <FormControl maxW={"80%"} id="model" isInvalid={!!errors.model}>
              <FormLabel>Model</FormLabel>
              <Input
                {...register("model")}
                defaultValue={carData?.model}
                placeholder="car model"
              />
              {errors.model && (
                <p className="text-red-500">{errors.model.message}</p>
              )}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl maxW={"80%"} id="brand" isInvalid={!!errors.brand}>
              <FormLabel>Brand</FormLabel>
              <Input
                {...register("brand")}
                defaultValue={carData?.brand}
                placeholder="car brand"
              />
              {errors.brand && (
                <p className="text-red-500">{errors.brand.message}</p>
              )}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl maxW={"80%"} id="gearBox" isInvalid={!!errors.gearBox}>
              <FormLabel>Gear Box</FormLabel>
              <Input
                {...register("gearBox")}
                defaultValue={carData?.gearBox}
                placeholder="auto or manuel"
              />
              {errors.gearBox && (
                <p className="text-red-500">{errors.gearBox.message}</p>
              )}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl maxW={"80%"} id="fuel" isInvalid={!!errors.fuel}>
              <FormLabel>Fuel</FormLabel>
              <Input
                {...register("fuel")}
                defaultValue={carData?.fuel}
                placeholder="gazoil or essence"
              />
              {errors.fuel && (
                <p className="text-red-500">{errors.fuel.message}</p>
              )}
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl maxW={"80%"} id="silenders">
              <FormLabel>Silenders</FormLabel>
              <Input
                type="number"
                {...register("silenders", { valueAsNumber: true })}
                defaultValue={carData?.silenders}
                placeholder="silenders"
              />
              {errors.silenders && (
                <p className="text-red-500">{errors.silenders.message}</p>
              )}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl maxW={"80%"} id="color" isInvalid={!!errors.color}>
              <FormLabel>Color</FormLabel>
              <Input
                {...register("color")}
                defaultValue={carData?.color}
                placeholder="car color"
              />
              {errors.color && (
                <p className="text-red-500">{errors.color.message}</p>
              )}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl maxW={"80%"} id="year">
              <FormLabel>Year</FormLabel>
              <Input
                type="number"
                {...register("year", { valueAsNumber: true })}
                defaultValue={carData?.year}
                placeholder="car year"
              />
              {errors.year && (
                <p className="text-red-500">{errors.year.message}</p>
              )}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl maxW={"80%"} id="daily_price">
              <FormLabel>Daily Price</FormLabel>
              <Input
                type="number"
                {...register("daily_price", { valueAsNumber: true })}
                defaultValue={carData?.daily_price}
                placeholder="daily price"
              />
              {errors.daily_price && (
                <p className="text-red-500">{errors.daily_price.message}</p>
              )}
            </FormControl>
          </GridItem>
        </Grid>

        {/* images */}

        {/* main image */}

        <>
          <SimpleGrid
            columns={{ sm: 1, lg: 3 }}
            justifyContent={"space-between"}
            mt={8}
          >
            <FormControl
              id="main_image_url"
              isInvalid={!!errors.main_image_url}
              minW={"auto"}
            >
              <FormLabel>Main Image </FormLabel>
              <Input
                type="hidden"
                {...register("main_image_url")}
                defaultValue={carData?.main_image_url}
                isReadOnly
              />
              <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onUpload={(result) => {
                  if (result.event !== "success") return;
                  const info = result.info as cloudinaryResult;
                  handleUpload(info.secure_url, "main_image_url");
                }}
              >
                {({ open }) => (
                  <Button
                    onClick={() => {
                      setUploading(true);
                      open();
                    }}
                    isDisabled={uploading}
                  >
                    {uploading ? <Spinner /> : "Upload Main Image"}
                  </Button>
                )}
              </CldUploadWidget>
              {errors.main_image_url && (
                <p className="text-red-500">{errors.main_image_url.message}</p>
              )}
              {main_image && (
                <Box>
                  <Image
                    src={main_image}
                    alt="Main mage"
                    objectFit="cover"
                    w={"250px"}
                    h={"150px"}
                    borderRadius={5}
                  />
                </Box>
              )}
            </FormControl>

            {/* second image */}

            <FormControl id="image1_url" isInvalid={!!errors.image1_url}>
              <FormLabel>Image 1 </FormLabel>
              <Input
                type="hidden"
                {...register("image1_url")}
                isReadOnly
                defaultValue={carData?.image1_url}
              />
              <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onUpload={(result) => {
                  if (result.event !== "success") return;
                  const info = result.info as cloudinaryResult;
                  handleUpload(info.secure_url, "image1_url");
                }}
              >
                {({ open }) => (
                  <Button
                    onClick={() => {
                      setUploading(true);
                      open();
                    }}
                    isDisabled={uploading}
                  >
                    {uploading ? <Spinner /> : "Upload Image 1"}
                  </Button>
                )}
              </CldUploadWidget>
              {errors.image1_url && (
                <p className="text-red-500">{errors.image1_url.message}</p>
              )}

              {image_1 && (
                <Box>
                  <Image
                    src={image_1}
                    alt="Image 1"
                    objectFit="cover"
                    w={"250px"}
                    h={"150px"}
                    borderRadius={5}
                  />
                </Box>
              )}
            </FormControl>

            {/* therd image */}

            <FormControl id="image2_url" isInvalid={!!errors.image2_url}>
              <FormLabel>Image 2 </FormLabel>
              <Input
                type="hidden"
                {...register("image2_url")}
                isReadOnly
                defaultValue={carData?.image2_url}
              />
              <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onUpload={(result) => {
                  if (result.event !== "success") return;
                  const info = result.info as cloudinaryResult;
                  handleUpload(info.secure_url, "image2_url");
                }}
              >
                {({ open }) => (
                  <Button
                    onClick={() => {
                      setUploading(true);
                      open();
                    }}
                    isDisabled={uploading}
                  >
                    {uploading ? <Spinner /> : "Upload Image 2"}
                  </Button>
                )}
              </CldUploadWidget>
              {errors.image2_url && (
                <p className="text-red-500">{errors.image2_url.message}</p>
              )}

              {image_2 && (
                <Box>
                  <Image
                    src={image_2}
                    alt="Image 2"
                    objectFit="cover"
                    w={"250px"}
                    h={"150px"}
                    borderRadius={5}
                  />
                </Box>
              )}
            </FormControl>

            {/* end images */}
          </SimpleGrid>
        </>
        {/* </Grid> */}
        {!carData && (
          <Button
            mt={4}
            type="submit"
            colorScheme="teal"
            disabled={isSubmiting}
          >
            {isSubmiting ? <Spinner /> : "Submit"}
          </Button>
        )}
        {carData && (
          <Button
            mt={4}
            type="submit"
            colorScheme="teal"
            disabled={isSubmiting}
          >
            {isSubmiting ? <Spinner /> : "Edit"}
          </Button>
        )}
      </form>
    </Box>
  );
};

export default CarForm;
// function toast(arg0: {
//   title: string;
//   description: string;
//   status: string;
//   duration: number;
//   isClosable: boolean;
// }) {
//   throw new Error("Function not implemented.");
// }
