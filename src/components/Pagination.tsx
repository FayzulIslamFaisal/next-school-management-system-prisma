"use client";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  count: number;
  page: number;
}

const Pagination = ({ count, page }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(count / ITEM_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <button
        disabled={page <= 1}
        onClick={() => handlePageChange(page - 1)}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      
      <div className="flex items-center gap-2 text-sm">
        {Array.from({ length: totalPages }).map((_, index) => {
          const pageIndex = index + 1;
          return (
            <button
              key={pageIndex}
              onClick={() => handlePageChange(pageIndex)}
              className={`px-2 rounded-sm ${
                page === pageIndex
                  ? "bg-lamaBlue text-white"
                  : "bg-lamaSky hover:bg-lamaBlue/50"
              }`}
            >
              {pageIndex}
            </button>
          );
        })}
      </div>

      <button
        disabled={page >= totalPages}
        onClick={() => handlePageChange(page + 1)}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;