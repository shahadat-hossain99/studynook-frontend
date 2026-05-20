const RoomCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl animate-pulse">
      {/* IMAGE SKELETON */}
      <div className="relative h-64 bg-white/10" />

      {/* CONTENT */}
      <div className="p-6">
        {/* NAME */}
        <div className="h-7 w-3/4 rounded-xl bg-white/10" />

        {/* INFO ROWS */}
        <div className="mt-6 space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
            >
              <div className="h-4 w-28 rounded-lg bg-white/10" />
              <div className="h-4 w-16 rounded-lg bg-white/10" />
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <div className="mt-6 h-10 w-full rounded-full bg-white/10" />
      </div>
    </div>
  );
};

const loading = () => {
  return (
    <section className="min-h-screen bg-[#0B1120] py-16 px-4">
      <div className="max-w-11/12 mx-auto">
        {/* HEADING SKELETON */}
        <div className="text-center mb-14 flex flex-col items-center gap-4">
          {/* BADGE */}
          <div className="h-9 w-48 rounded-full bg-white/10 animate-pulse" />
          {/* TITLE */}
          <div className="h-12 w-72 rounded-xl bg-white/10 animate-pulse" />
          <div className="h-12 w-56 rounded-xl bg-white/10 animate-pulse" />
          {/* DESCRIPTION */}
          <div className="mt-2 space-y-2 w-full max-w-2xl">
            <div className="h-4 w-full rounded-lg bg-white/10 animate-pulse" />
            <div className="h-4 w-4/5 mx-auto rounded-lg bg-white/10 animate-pulse" />
          </div>
        </div>

        {/* CARD GRID SKELETON */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <RoomCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default loading;
