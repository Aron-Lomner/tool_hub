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
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => {
          console.log(e);
          setSearchTerm(e.target.value);
        }}
      />
      {groups.map((group, index) => {
        return <SearchResultComponent key={index} group={group} />;
      })}
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
