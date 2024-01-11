/* eslint-disable react/prop-types */
const SearchResultComponent = ({ group }) => {
  const { name, description, imageUrl } = group;
  const joinGroup = () => {
    console.log("Joined group: ", name);
  };
  return (
    <div>
      <h1>{name}</h1>
      <img src={imageUrl} alt="" />
      <p>{description}</p>
      <button></button>
    </div>
  );
};

export default SearchResultComponent;
