function Navbar() {
  return (
    <div className="flex justify-between px-64 items-center bg-blue-100 h-10">
      <h1 className="text-2xl text-cyan-700 font-bold">CRUD APP</h1>
      <div className="flex">
        <h3 className="pr-4 text-cyan-700 font-medium">NAV1</h3>
        <h3 className="text-cyan-700 font-medium">NAV2</h3>
      </div>
    </div>
  );
}

export default Navbar;
