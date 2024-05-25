// pages/car-info.tsx
"use client";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Grid,
  GridItem,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
// import { carSchema } from "../apis/cars/route";

const carSchema = z.object({
  model: z.string().min(1, "Model name is required."),
  brand: z.string().min(1, "Brand name is required."),
  gearBox: z.string().min(1, "Gearbox type is required."),
  fuel: z.string().min(1, "Fuel type is required."),
  main_image_url: z.string().url("Main image must be a valid URL."),
  image1_url: z.string().url("First image must be a valid URL.").optional(),
  image2_url: z.string().url("Second image must be a valid URL.").optional(),
  silenders: z.number().int().min(1, "Sylinder count must be at least 1."),
  color: z.string().min(1, "Car color is required."),
  year: z.number().int().min(1900, "Year must be after 1900.").max(new Date().getFullYear(), "Year cannot be in the future."),
  daily_price: z.number().min(0, "Daily price must be a non-negative number."),
  // rentalId: z.number().int().min(1, "Rental ID is required."),
});

type CarFormData = z.infer<typeof carSchema>;

interface cloudinaryResult {
  secure_url: string;
}

const CarInfo = () => {
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

  const onSubmit = (data: FieldValues) => {
    console.log( data);
  };

  return (
    <Box minW={{ base: "sm", md: "md", lg: "lg" }} mx="auto" mt={8}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
          <GridItem>
            <FormControl id="model" isInvalid={!!errors.model}>
              <FormLabel>Model</FormLabel>
              <Input {...register("model")} />
              {errors.model && <p className="text-red-500">{errors.model.message}</p>}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl id="brand" isInvalid={!!errors.brand}>
              <FormLabel>Brand</FormLabel>
              <Input {...register("brand")} />
              {errors.brand && <p className="text-red-500">{errors.brand.message}</p>}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl id="gearBox" isInvalid={!!errors.gearBox}>
              <FormLabel>Gear Box</FormLabel>
              <Input {...register("gearBox")} />
              {errors.gearBox && <p className="text-red-500">{errors.gearBox.message}</p>}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl id="fuel" isInvalid={!!errors.fuel}>
              <FormLabel>Fuel</FormLabel>
              <Input {...register("fuel")} />
              {errors.fuel && <p className="text-red-500">{errors.fuel.message}</p>}
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl id="silenders">
              <FormLabel>Silenders</FormLabel>
              <Input type="number" {...register("silenders", { valueAsNumber: true })} />
              {errors.silenders && <p className="text-red-500">{errors.silenders.message}</p>}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl id="color" isInvalid={!!errors.color}>
              <FormLabel>Color</FormLabel>
              <Input {...register("color")} />
              {errors.color && <p className="text-red-500">{errors.color.message}</p>}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl id="year">
              <FormLabel>Year</FormLabel>
              <Input type="number" {...register("year", { valueAsNumber: true })} />
              {errors.year && <p className="text-red-500">{errors.year.message}</p>}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl id="daily_price">
              <FormLabel>Daily Price</FormLabel>
              <Input type="number" {...register("daily_price", { valueAsNumber: true })} />
              {errors.daily_price && <p className="text-red-500">{errors.daily_price.message}</p>}
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl
              id="main_image_url"
              isInvalid={!!errors.main_image_url}
            >
              <FormLabel>Main Image URL</FormLabel>
              <Input type="hidden" {...register("main_image_url")} isReadOnly />
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
              {errors.main_image_url && <p className="text-red-500">{errors.main_image_url.message}</p>}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl id="image1_url" isInvalid={!!errors.image1_url}>
              <FormLabel>Image 1 URL</FormLabel>
              <Input type="hidden" {...register("image1_url")} isReadOnly />
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
              {errors.image1_url && <p className="text-red-500">{errors.image1_url.message}</p>}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl id="image2_url" isInvalid={!!errors.image2_url}>
              <FormLabel>Image 2 URL</FormLabel>
              <Input type="hidden" {...register("image2_url")} isReadOnly />
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
            </FormControl>
          </GridItem>
        </Grid>
        <Button mt={4} type="submit" colorScheme="teal">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default CarInfo;
