import GroupServices from "../../services/GroupService";
import { useLocation } from "react-router-dom";
export const GroupPage = () => {
  const groupName = useLocation.state?.groupName;
  return <div></div>;
};
