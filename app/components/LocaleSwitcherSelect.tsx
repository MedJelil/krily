"use client";

import { FaCheck, FaGlobe } from "react-icons/fa";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { useTransition } from "react";
import { Locale } from "@/config";
import { setUserLocale } from "@/services/locale";

type Props = {
  defaultValue: string;
  items: Array<{ value: string; label: string }>;
  label: string;
};

export default function LocaleSwitcherSelect({
  defaultValue,
  items,
  label,
}: Props) {
  const [isPending, startTransition] = useTransition();

  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <div className=" my-1 ">
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<Icon as={FaGlobe} w={6} h={6} />}
          isDisabled={isPending}
          minW="100%"
          mx={"0"}
          aria-label={label}
        >
          {isPending ? <Spinner size="sm" /> : "Select Language"}
        </MenuButton>
        <MenuList>
          {items.map((item) => (
            <MenuItem
              key={item.value}
              onClick={() => onChange(item.value)}
              icon={item.value === defaultValue ? <FaCheck /> : undefined}
            >
              {item.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
}
