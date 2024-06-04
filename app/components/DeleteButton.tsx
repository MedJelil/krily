import React from "react";
import { Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import Link from "next/link";

interface props {
  link: string;
}

const DeleteButton = ({ link }: props) => {
  return (
    <Link href={link}>
      <Button leftIcon={<DeleteIcon />} colorScheme="red" variant="solid">
        Delete
      </Button>
    </Link>
  );
};

export default DeleteButton;
