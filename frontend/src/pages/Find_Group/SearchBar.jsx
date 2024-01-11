/* eslint-disable react/prop-types */
import { useState } from "react";
import GroupService from "../../services/GroupService";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [groups, setGroups] = useState("ada");
  let [number, setNumber] = useState(0);
  const handleSearch = () => {};

  return (
    <div>
      {/* <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => {
          console.log(e);
          setSearchTerm(e.target.value);
        }}
      /> */}
      {/* <button onClick={handleSearch}>Search</button> */}
      <p>{number}</p>
      <button
        onClick={() => {
          setNumber(number + 1);
        }}
      >
        add
      </button>
    </div>
  );
};

export default SearchBar;
