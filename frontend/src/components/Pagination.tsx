interface Props {
  page: number;
  setPage: (page: number) => void;
}

export default function Pagination({ page, setPage }: Props) {
  return (
    <div className="flex justify-center gap-4 mt-6">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Précédent
      </button>
      <span className="px-4 py-2">Page {page}</span>
      <button
        onClick={() => setPage(page + 1)}
        className="px-4 py-2 bg-gray-300 rounded"
      >
        Suivant
      </button>
    </div>
  );
}
