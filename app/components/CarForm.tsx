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
  Grid,
  GridItem,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
// import { carSchema } from "../apis/cars/route";

const carSchema = z.object({
  model: z.string().min(1, "Model name is required."),
  brand: z.string().min(1, "Brand name is required."),
  gearBox: z.string().min(1, "Gearbox type is required."),
  fuel: z.string().min(1, "Fuel type is required."),
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

  const handleUpload = (url: string, field: keyof CarFormData) => {
    setValue(field, url);
    setUploading(false);
  };

  const router = useRouter();
  const onSubmit = async (data: FieldValues) => {
    if (carData) {
      // console.log(carData);
      try {
        await axios.put(`/apis/cars/${carData.id}`, { ...data, rentalId: 2 } );
        router.push(`/rental/cars/details/${carData.id}`);
      } catch (error) {}
    } else {
      try {
        await axios.post("/apis/cars", { ...data, rentalId: 2 });
        router.push("/rental/cars/new");
      } catch (error) {}
    }
  };

  return (
    <Box minW={{ base: "sm", md: "md", lg: "lg" }} mx="auto" mt={8} p={2}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
          <GridItem>
            <FormControl id="model" isInvalid={!!errors.model}>
              <FormLabel>Model</FormLabel>
              <Input {...register("model")} defaultValue={carData?.model} />
              {errors.model && (
                <p className="text-red-500">{errors.model.message}</p>
              )}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl id="brand" isInvalid={!!errors.brand}>
              <FormLabel>Brand</FormLabel>
              <Input {...register("brand")} defaultValue={carData?.brand} />
              {errors.brand && (
                <p className="text-red-500">{errors.brand.message}</p>
              )}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl id="gearBox" isInvalid={!!errors.gearBox}>
              <FormLabel>Gear Box</FormLabel>
              <Input {...register("gearBox")} defaultValue={carData?.gearBox} />
              {errors.gearBox && (
                <p className="text-red-500">{errors.gearBox.message}</p>
              )}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl id="fuel" isInvalid={!!errors.fuel}>
              <FormLabel>Fuel</FormLabel>
              <Input {...register("fuel")} defaultValue={carData?.fuel} />
              {errors.fuel && (
                <p className="text-red-500">{errors.fuel.message}</p>
              )}
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl id="silenders">
              <FormLabel>Silenders</FormLabel>
              <Input
                type="number"
                {...register("silenders", { valueAsNumber: true })}
                defaultValue={carData?.silenders}
              />
              {errors.silenders && (
                <p className="text-red-500">{errors.silenders.message}</p>
              )}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl id="color" isInvalid={!!errors.color}>
              <FormLabel>Color</FormLabel>
              <Input {...register("color")} defaultValue={carData?.color} />
              {errors.color && (
                <p className="text-red-500">{errors.color.message}</p>
              )}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl id="year">
              <FormLabel>Year</FormLabel>
              <Input
                type="number"
                {...register("year", { valueAsNumber: true })}
                defaultValue={carData?.year}
              />
              {errors.year && (
                <p className="text-red-500">{errors.year.message}</p>
              )}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl id="daily_price">
              <FormLabel>Daily Price</FormLabel>
              <Input
                type="number"
                {...register("daily_price", { valueAsNumber: true })}
                defaultValue={carData?.daily_price}
              />
              {errors.daily_price && (
                <p className="text-red-500">{errors.daily_price.message}</p>
              )}
            </FormControl>
          </GridItem>

          {/* images */}

          <GridItem>
            <HStack>
              <FormControl
                id="main_image_url"
                isInvalid={!!errors.main_image_url}
              >
                <FormLabel>Main Image </FormLabel>
                <Input
                  type="hidden"
                  {...register("main_image_url")}
                  defaultValue={carData?.main_image_url}
                  isReadOnly
                />
                <CldUploadWidget
                  uploadPreset={
                    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                  }
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
                  <p className="text-red-500">
                    {errors.main_image_url.message}
                  </p>
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
                  uploadPreset={
                    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                  }
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
                  uploadPreset={
                    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                  }
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
              </FormControl>
            </HStack>
          </GridItem>
        </Grid>
        {!carData && (
          <Button mt={4} type="submit" colorScheme="teal">
            Submit
          </Button>
        )}
        {carData && (
          <Button mt={4} type="submit" colorScheme="teal">
            Edit
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
