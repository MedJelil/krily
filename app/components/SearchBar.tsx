// components/SearchBar.tsx

import { FC, useState } from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
} from "@chakra-ui/react";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({
  placeholder = "Search for car...",
  onSearch,
}) => {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setQuery(e.target.value);
  //   };

  const params = new URLSearchParams(searchParams);
  function handleSearch(term: string) {
    setQuery(term);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
    // console.log(term);
  }

  const handleClear = () => {
    setQuery("");
    onSearch("");
    params.delete("query");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <InputGroup m={2}>
      <InputLeftElement
        pointerEvents="none"
        children={<SearchIcon color="gray.300" />}
      />
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        // onChange={handleInputChange}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        pr="4.5rem"
      />
      {query && (
        <IconButton
          aria-label="Clear search"
          icon={<CloseIcon />}
          onClick={handleClear}
          position="absolute"
          right="0"
          zIndex={10}
        />
      )}
      {/* <IconButton
        aria-label="Search"
        icon={<SearchIcon />}
        onClick={handleSearch}
        position="absolute"
        right="0"
        zIndex={10}
      /> */}
    </InputGroup>
  );
};

export default SearchBar;
