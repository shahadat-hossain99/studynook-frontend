const RoomPage = async () => {
  const res = await fetch("http://localhost:5004/room");

  const allRoom = await res.json();
  console.log(allRoom);

  return (
    <section className="min-h-screen bg-[#0B1120] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* HEADING */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-slate-300 backdrop-blur-xl">
            Available Study Rooms
          </div>

          <h1 className="mt-6 text-4xl md:text-6xl font-black text-white md:leading-18">
            Explore Premium
            <span className="block bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Study Spaces
            </span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-slate-400 leading-relaxed">
            Discover peaceful, fully equipped study rooms designed for focused
            learning and productivity.
          </p>
        </div>

        {/* ROOM GRID */}
        {/* {allRoom?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <RoomCard
                key={room._id}
                room={room}
              />
            ))}
          </div>
        ) : (
          <NoRoomsFound />
        )} */}
      </div>
    </section>
  );
};

export default RoomPage;
