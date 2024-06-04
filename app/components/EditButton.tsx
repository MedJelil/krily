import React from "react";
import { Button } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import Link from "next/link";

interface props {
  link: string;
}

const EditButton = ({ link }: props) => {
  return (
    <Link href={link}>
      <Button leftIcon={<EditIcon />} colorScheme="yellow" variant="solid">
        Edit
      </Button>
    </Link>
  );
};

export default EditButton;
