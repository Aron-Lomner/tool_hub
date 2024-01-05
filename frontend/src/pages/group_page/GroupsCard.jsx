/* eslint-disable no-unused-vars */
import GroupServices from "../../services/GroupService";
import { useState, useEffect } from "react";
const GroupsCard = () => {
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    setGroups(GroupServices);
  }, []);
  //   useEffect(() => {
  //     let responseClone;

  //     fetch("/grouppage")
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error("Network response was not ok");
  //         }
  //         responseClone = response.clone();
  //         return response.json();
  //       })
  //       .then((data) => setGroups(data))
  //       .catch((error) => {
  //         console.error("Error fetching groups:", error);

  //         if (responseClone) {
  //           responseClone.text()
  //             .then((bodyText) => {
  //               console.log('Received the following instead of valid JSON:', bodyText);
  //             })
  //             .catch((textError) => {
  //               console.error('Error reading response text:', textError);
  //             });
  //         }
  //       });
  //   }, []);

  return (
    <div
      className="main w-full h-full flex justify-center items-center font-sans
    "
    >
      <div className="flex flex-col bg-sky-950	 w-1/2 h-3/4 items-center justify-center rounded-md shadow-md ">
        <h1 className="text-white">My Groups</h1>
        <div className="textbox w-full h-1/5  flex items-center justify-left pl-5 ">
          <input
            type="text"
            placeholder="Search by Group name"
            className=" h-1/4 w-1/2 shadow-md"
          />
        </div>
        <div className="groups-card w-full h-1/2  font-semibold  text-sky-700 overflow-auto ">
          <ul className=" list-none relative h-auto w-auto">
            {groups.map((group) => (
              <li
                key={group.id}
                className=" bg-sky-950 hover:bg-sky-900
             	hover:text-sky-500 cursor-pointer h-32 w-full flex mt-5 rounded-3xl shadow-md space-x-24 
               list-none m-0 p-0
            
            "
              >
                <div className="grow-1">
                  <img
                    src={group.imageUrl}
                    alt=""
                    className=" ml-4 w-32 object-cover rounded-full"
                  />
                </div>

                <div className="grow">
                  <h3 className=" m-0 w-full  ">{group.name}</h3>
                  <p className=" m-0 w-full   ">{group.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <button className=""></button>
        <button></button>
      </div>
    </div>
  );
};
export default GroupsCard;
