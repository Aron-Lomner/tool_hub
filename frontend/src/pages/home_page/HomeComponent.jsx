import GroupService from "../../services/GroupService";
const HomeComponent = () => {
  const something = () => {
    GroupService.getUserGroups();
  };
  return <button onClick={something}>Hello</button>;
};

export default HomeComponent;
