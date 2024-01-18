import GroupCard from "./GroupsCard";
import GroupService from "../../services/GroupService";
import { useEffect, useState } from "react";
import UnauthorizedError from "../../errors/UnauthorizedError";
import { useNavigate } from "react-router-dom";
import NewGroup from "./NewGroup";
import Navbar from "../../components/Navbar";
import GroupPage from "../group_page/GroupPage";

export const HomePage = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [displayNewGroup, setDisplayNewGroup] = useState(false);
  const [displayGroupPage, setDisplayGroupPage] = useState("");
  const toggleDisplayNewGroup = () => {
    setDisplayNewGroup(!displayNewGroup);
    //refresh
    getGroups();
  };
  const getGroups = async () => {
    try {
      const data = await GroupService.getUserGroups();
      setGroups(data);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        navigate("/", { state: { msg: "Session Timed Out" } });
      }
      console.log(error);
    }
  };
  useEffect(() => {
    getGroups();
  }, []);
  return (
    <>
      {displayGroupPage === "" && (
        <div className="bg-[url('/src/assets/bg4.jpg')] bg-cover bg-no-repeat bg-center min-h-screen">
          <Navbar />
          <div className="mx-[20vw] my-[20vh]">
            <h1 className="font-semibold text-2xl text-center text-[#484bff]">
              My groups
            </h1>
            {groups.map((group, index) => {
              return (
                <GroupCard
                  key={index}
                  setDisplayGroupPage={(p) => {
                    setDisplayGroupPage(p);
                  }}
                  group={group}
                />
              );
            })}
            <button
              onClick={() => {
                toggleDisplayNewGroup();
              }}
              className="fixed z-10 bottom-20 right-20 bg-blue-500 hover:bg-blue-700 rounded-full w-16 h-16 p-10 text-white font-bold text-2xl overflow-hidden flex items-center justify-center"
            >
              +
            </button>
            {displayNewGroup && <NewGroup exit={toggleDisplayNewGroup} />}
          </div>
        </div>
      )}
      {displayGroupPage !== "" && (
        <GroupPage
          groupName={displayGroupPage}
          setDisplayGroupPage={setDisplayGroupPage}
        />
      )}
    </>
  );
};
