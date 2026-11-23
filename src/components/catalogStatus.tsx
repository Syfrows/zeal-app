type CatalogStatusProps = {
  loading?: boolean;
  unavailable?: boolean;
  empty: string;
  retry?: () => unknown;
};

export default function CatalogStatus({
  loading,
  unavailable,
  empty,
  retry,
}: CatalogStatusProps) {
  return (
    <div className="zeal-status" role="status">
      <p>
        {loading
          ? "Loading the collection…"
          : unavailable
          ? "The collection is temporarily unavailable."
          : empty}
      </p>
      {unavailable && !loading && retry && (
        <button
          className="zeal-button zeal-button-dark"
          onClick={() => void Promise.resolve(retry()).catch(() => undefined)}
          type="button"
        >
          Try again
        </button>
      )}
    </div>
  );
}
