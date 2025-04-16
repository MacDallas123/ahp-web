import { FaCalculator } from "react-icons/fa";

const Header = () => {
    return (
        <div className="bg-gray-300 text-gray-500 border-2 border-gray-700 w-full text-center py-4 mb-4 flex flex-col">
            <h1 className="text-[25px] md:text-[48px] flex flex-row items-center justify-center"> <FaCalculator className="mr-3"/>AHP Computer</h1>
        </div>
    );
}

export default Header;