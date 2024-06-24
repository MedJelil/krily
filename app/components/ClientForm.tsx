// pages/client-info.tsx
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
  Spinner,
  useToast,
  SimpleGrid,
  Image,
  Heading,
  Card,
} from "@chakra-ui/react";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";

const clientSchema = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z\s'-]+$/, "Invalid name. Only alphabets allowed."),
  phoneNumber: z.string().regex(/^[234]\d{7}$/, "Invalid telephone number."),
  //   status: z
  //     .enum(["VERIFIED", "IN_PROGRESS", "NOT_VERIFIED", "BLOCKED"])
  //     .optional(),
  //   password: z
  //     .string()
  //     .regex(
  //       /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  //       "Password must be at least 8 characters long and include both letters and numbers."
  //     ),
  image_url: z.string(),
  permis: z.string(),
  identity: z.string(),
});

type ClientFormData = z.infer<typeof clientSchema>;

interface CloudinaryResult {
  secure_url: string;
}

interface Props {
  clientData?: {
    id: number;
    name: string;
    phoneNumber: string;
    image_url: string;
    permis: string;
    identity: string;
  };
}

const ClientForm = ({ clientData }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
  });

  const [uploading, setUploading] = useState(false);
  const [image_url, setImage_url] = useState(clientData?.image_url || "");
  const [permis, setPermis] = useState(clientData?.permis || "");
  const [identity, setIdentity] = useState(clientData?.identity || "");

  const handleUpload = (url: string, field: keyof ClientFormData) => {
    setValue(field, url);
    setUploading(false);
    field == "image_url"
      ? setImage_url(url)
      : field == "permis"
      ? setPermis(url)
      : setIdentity(url);
  };

  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);
  const toast = useToast();

  const onSubmit = async (data: FieldValues) => {
    try {
      setSubmitting(true);
      const result = clientData
        ? await axios.put(`/apis/clients/${clientData.id}`, {
            ...data,
            status: "IN_PROGRESS",
          })
        : await axios.post("/apis/clients", { ...data, status: "IN_PROGRESS" });
      if (result) {
        const showToast = () =>
          toast({
            title: `Client ${clientData ? "updated" : "created"} successfully.`,
            description: `We've ${
              clientData ? "updated" : "created"
            } your client for you.`,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        router.push("/user/cars");
        showToast();
      }
    } catch (error) {
      setSubmitting(false);
    }
  };

  return (
    <Box minW={{ base: "sm", md: "md", lg: "lg" }} mx="auto" mt={8} p={2}>
      <Card p={7} mx={{lg: 3, xl: 36}}>
        <Heading mb={10} as="h2" size="lg" textAlign={"center"}>
          {" "}
          If you want to verify your account you must to complete your profile{" "}
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={4}>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel>Name</FormLabel>
              <Input
                {...register("name")}
                defaultValue={clientData?.name}
                placeholder="Client name"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.phoneNumber}>
              <FormLabel>Phone Number</FormLabel>
              <Input
                {...register("phoneNumber")}
                defaultValue={clientData?.phoneNumber}
                placeholder="Phone number"
              />
              {errors.phoneNumber && (
                <p className="text-red-500">{errors.phoneNumber.message}</p>
              )}
            </FormControl>
            {/* <FormControl isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              {...register("password")}
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </FormControl> */}
            {/* <FormControl isInvalid={!!errors.status}>
            <FormLabel>Status</FormLabel>
            <Input
              {...register("status")}
              defaultValue={clientData?.status}
              placeholder="Status"
            />
            {errors.status && (
              <p className="text-red-500">{errors.status.message}</p>
            )}
          </FormControl> */}
          </SimpleGrid>

          {/* Image uploaders */}
          <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={4} mt={8}>
            <FormControl isInvalid={!!errors.image_url}>
              <FormLabel>Profile Image</FormLabel>
              <Input
                type="hidden"
                {...register("image_url")}
                defaultValue={clientData?.image_url}
                isReadOnly
              />
              <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onUpload={(result) => {
                  if (result.event !== "success") return;
                  const info = result.info as CloudinaryResult;
                  handleUpload(info.secure_url, "image_url");
                }}
              >
                {({ open }) => (
                  <Button
                    className="w-full"
                    onClick={() => {
                      setUploading(true);
                      open();
                    }}
                    isDisabled={uploading}
                  >
                    {uploading ? <Spinner /> : "Upload Profile Image"}
                  </Button>
                )}
              </CldUploadWidget>
              {errors.image_url && (
                <p className="text-red-500">{errors.image_url.message}</p>
              )}
              {image_url && (
                <Box>
                  <Image
                    src={image_url}
                    alt="Profile Image"
                    objectFit="cover"
                    w={"250px"}
                    h={"150px"}
                    borderRadius={5}
                  />
                </Box>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.permis}>
              <FormLabel>Permis</FormLabel>
              <Input
                type="hidden"
                {...register("permis")}
                defaultValue={clientData?.permis}
                isReadOnly
              />
              <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onUpload={(result) => {
                  if (result.event !== "success") return;
                  const info = result.info as CloudinaryResult;
                  handleUpload(info.secure_url, "permis");
                }}
              >
                {({ open }) => (
                  <Button
                    className="w-full"
                    onClick={() => {
                      setUploading(true);
                      open();
                    }}
                    isDisabled={uploading}
                  >
                    {uploading ? <Spinner /> : "Upload Permis"}
                  </Button>
                )}
              </CldUploadWidget>
              {errors.permis && (
                <p className="text-red-500">{errors.permis.message}</p>
              )}
              {permis && (
                <Box>
                  <Image
                    src={permis}
                    alt="Permis"
                    objectFit="cover"
                    w={"250px"}
                    h={"150px"}
                    borderRadius={5}
                  />
                </Box>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.identity}>
              <FormLabel>Identity</FormLabel>
              <Input
                type="hidden"
                {...register("identity")}
                defaultValue={clientData?.identity}
                isReadOnly
              />
              <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onUpload={(result) => {
                  if (result.event !== "success") return;
                  const info = result.info as CloudinaryResult;
                  handleUpload(info.secure_url, "identity");
                }}
              >
                {({ open }) => (
                  <Button
                    className="w-full"
                    onClick={() => {
                      setUploading(true);
                      open();
                    }}
                    isDisabled={uploading}
                  >
                    {uploading ? <Spinner /> : "Upload Identity"}
                  </Button>
                )}
              </CldUploadWidget>
              {errors.identity && (
                <p className="text-red-500">{errors.identity.message}</p>
              )}
              {identity && (
                <Box>
                  <Image
                    src={identity}
                    alt="Identity"
                    objectFit="cover"
                    w={"250px"}
                    h={"150px"}
                    borderRadius={5}
                  />
                </Box>
              )}
            </FormControl>
          </SimpleGrid>
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Button
              mt={4}
              type="submit"
              colorScheme="teal"
              disabled={isSubmitting}
              className="w-1/2"
            >
              {isSubmitting ? <Spinner /> : clientData ? "Verify" : "Submit"}
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default ClientForm;
