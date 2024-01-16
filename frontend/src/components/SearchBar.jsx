/* eslint-disable react/prop-types */
import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="flex justify-center w-[80vw] h-12 mt-4">
      <input
        type="text"
        placeholder="Search..."
        maxLength={255}
        value={searchTerm}
        onChange={(e) => {
          console.log(e);
          setSearchTerm(e.target.value);
        }}
        className="rounded-l-full pl-5 w-[55%]  bg-purple-500 text-white placeholder:text-white outline-none"
      />
      <button
        onClick={()=>{onSearch(searchTerm)}}
        className="px-8 text-white bg-purple-600 rounded-r-full hover:bg-purple-400"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
