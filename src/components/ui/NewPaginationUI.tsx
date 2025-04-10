import { FC } from "react";

interface PaginationProps {
    currentPage: number;
    totalPage: number;
    onPageChange: (page: number) => void;
}

const NewPagination: FC<PaginationProps> = ({ currentPage, totalPage, onPageChange}) => {
    const TotalPages = Array.from({ length: totalPage }, (_, i) => i + 1);
    return totalPage ? (
      <>
        <div className="flex items-center justify-center space-x-2 pag-ination py-2">
          <button
            className="px-3 py-2 rounded-md bg-gray-200 text-gray-600"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            &lt;
          </button>
          {TotalPages.map((l) => (
            <button
              key={l}
              onClick={() => onPageChange(l)}
              className={`px-3 py-2 rounded-md ${currentPage === l ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800'}`}
              disabled={currentPage === l}
            >
              {l}
            </button>
          ))}
          <button
            className="px-3 py-2 rounded-md bg-gray-200 text-gray-600"
            disabled={currentPage === totalPage}
            onClick={() => onPageChange(currentPage + 1)}
          >
            &gt;
          </button>
        </div>
      </>
    ) : null;
  };
  
  export default NewPagination;
  