"use client";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface props {
  id: number;
}

const DeleteButton = ({ id }: props) => {
  const [isDeleting, setDeleting] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const clickHandler = async (id: number) => {
    setDeleting(true);
    try {
      const result = await axios.delete(`/apis/cars/${id}`);
      if(result){
        const showToast = () => toast({
          title: 'Car deleted succesfuly.',
          description: "We've delete your car for you.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        showToast();
      }
      router.push("/rental/cars");
      
    } catch (error) {
      if(error){
        const showToast = () => toast({
          title: 'Error',
          description: "unexpected error",
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        showToast();
      }
    }

  };

  const cancelRef = useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button colorScheme="red" onClick={onOpen} disabled={isDeleting}>
        {isDeleting ? <Spinner /> : "Delete"}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => clickHandler(id)}
                ml={3}
                disabled={isDeleting}
              >
                {isDeleting ? <Spinner /> : "Delete"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteButton;
// function useDisclosure(): { isOpen: any; onOpen: any; onClose: any } {
//   throw new Error("Function not implemented.");
// }
