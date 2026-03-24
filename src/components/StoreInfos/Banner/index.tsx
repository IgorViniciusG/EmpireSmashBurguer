export function Banner() {
  return (
    <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-md mt-8 shadow-gray-400">
      <img
        src="/images/bannerEmpireSmash.png"
        alt="Empire Smash Burguer"
        className="w-full h-full object-cover "
      />
      <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/40 to-transparent" />
      <div className="absolute bottom-8 left-8">
        <h1 className="text-5xl font-bold text-white mb-2">
          Empire Smash Burguer
        </h1>
      </div>
    </div>
  );
}
