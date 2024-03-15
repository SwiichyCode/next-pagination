import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

type PaginationProps = {
  page?: number;
  totalPages: number;
  hasNextPage: boolean;
};

export const Pagination_ = (props: PaginationProps) => {
  const { page = 1, totalPages, hasNextPage } = props;
  const currentPage = Math.min(Math.max(Number(page), 1), totalPages);

  const getPagesToShow = () => {
    const pagesToShow = 5;
    const half = Math.floor(pagesToShow / 2);
    const start = Math.max(currentPage - half, 1);
    const end = Math.min(start + pagesToShow, totalPages);

    return Array.from({ length: end - start }, (_, i) => start + i);
  };

  const pages = getPagesToShow();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`?page=${currentPage - 1}`}
            className={cn(currentPage === 1 && "pointer-events-none")}
          />
        </PaginationItem>

        {pages.map((page) => (
          <PaginationItem key={page}>
            <Link
              href={`?page=${page}`}
              className={cn(
                page === currentPage && " text-white",
                "rounded-lg px-4 py-2 text-gray-900 hover:bg-gray-200",
              )}
            >
              {page}
            </Link>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={`?page=${currentPage + 1}`}
            className={cn(!hasNextPage && "pointer-events-none")}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
