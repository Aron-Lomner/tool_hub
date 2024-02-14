/* eslint-disable react/prop-types */
import { useState } from "react";
import GroupService from "../../services/GroupService";
import SearchResultComponent from "./SearchResultComponent";
import SearchBar from "../../components/SearchBar";

const SearchBody = () => {
  const [groups, setGroups] = useState([]);
  const handleSearch = async (searchTerm) => {
    try {
      const response = await GroupService.searchGroupByPattern(searchTerm);
      setGroups(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <SearchBar onSearch={handleSearch} />
      {groups.map((group, index) => {
        return <SearchResultComponent key={index} group={group} />;
      })}
    </div>
  );
};

export default SearchBody;
