import GroupCard from "./GroupsCard";
import GroupService from "../../services/GroupService";
import { useEffect, useState } from "react";
import UnauthorizedError from "../../errors/UnauthorizedError";
import { useNavigate } from "react-router-dom";
import NewGroup from "./NewGroup";
import Navbar from "../../components/Navbar";

export const HomePage = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [displayNewGroup, setDisplayNewGroup] = useState(false);
  const toggleDisplayNewGroup = () => {
    setDisplayNewGroup(!displayNewGroup);
  };
  const getGroups = async () => {
    try {
      const data = await GroupService.getUserGroups();
      setGroups(data);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        //display message then redirect to login
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
      console.log(error);
    }
  };
  useEffect(() => {
    getGroups();
  }, []);
  return (
    <>
      <Navbar />
      <div className="mx-[20vw] my-[20vh]">
        <h1>My groups</h1>
        {groups.map((group, index) => {
          return <GroupCard key={index} group={group} />;
        })}
        <button
          onClick={toggleDisplayNewGroup}
          className="fixed bottom-20 right-20 bg-blue-500 hover:bg-blue-700 rounded-full w-16 h-16 p-10 text-white font-bold text-2xl overflow-hidden flex items-center justify-center"
        >
          +
        </button>
        {displayNewGroup && <NewGroup exit={toggleDisplayNewGroup} />}
      </div>
    </>
  );
};
