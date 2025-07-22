export function LoadingSpinner() {
  return (
    <div className="relative h-10 w-10">
      <div className="absolute inset-0 rounded-full border-4 border-secondary"></div>
      {/*
        <div className="absolute inset-0 rounded-full border-4 border-b-amber-300"></div>
      */}
      <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
    </div>
  );
}