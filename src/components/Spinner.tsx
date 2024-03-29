function Spinner() {
  return (
    <div
      className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent  rounded-full text-text"
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export { Spinner };
