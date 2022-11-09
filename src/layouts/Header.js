import { FaHome } from "react-icons/fa";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 h-10 text-blue-600 border-b-2 border-blue-600 flex justify-center">
      <span className="  px-4 py-2">
        <FaHome className="mt-1" />
      </span>
      <span className="text-xl font-bold ml-4  py-2">GitHub Repo Search</span>
    </header>
  );
};

export default Header;
