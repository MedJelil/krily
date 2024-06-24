"use client";
import CarsGrid from "@/app/components/CarsGrid";
import SearchBar from "@/app/components/SearchBar";
import { Stack } from "@chakra-ui/react";

const Cars = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const handleSearch = (query: string) => {
    console.log("Search query:", query);
    // Handle the search logic here
  };
  return (
    <>
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          {/* <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1> */}
        </div>
        <Stack direction={"column"}>
          <SearchBar onSearch={handleSearch} />
          <CarsGrid
            showed_for="admin"
            query={query}
            currentPage={currentPage}
          />
        </Stack>
        {/*  <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
<Table query={query} currentPage={currentPage} />
</Suspense> */}
        <div className="mt-5 flex w-full justify-center">
          {/* <Pagination totalPages={totalPages} /> */}
        </div>
      </div>
    </>
  );
};

export default Cars;
