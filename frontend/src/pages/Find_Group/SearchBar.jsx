/* eslint-disable react/prop-types */
import { useState } from "react";
import GroupService from "../../services/GroupService";
import SearchResultComponent from "./SearchResultComponent";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [groups, setGroups] = useState([]);
  const handleSearch = async () => {
    try {
      const response = await GroupService.searchGroupByPattern(searchTerm);
      setGroups(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center w-[80vw] h-12 mt-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            console.log(e);
            setSearchTerm(e.target.value);
          }}
          className="rounded-l-full pl-5 w-[55%]  bg-purple-500 text-white placeholder:text-white outline-none"
        />
        <button
          onClick={handleSearch}
          className="px-8 text-white bg-purple-300 rounded-r-full"
        >
          Search
        </button>
      </div>
      {groups.map((group, index) => {
        return <SearchResultComponent key={index} group={group} />;
      })}
    </div>
  );
};

export default SearchBar;
