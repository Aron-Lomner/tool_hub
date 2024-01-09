/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// const GroupMessageCard = ({ messageCard }) => {
//   const { sent, userName, message, imageUrl } = messageCard;

//   const maxLineLength = 20; // Change this to your desired length
//   const lines = [];

//   for (let i = 0; i < message.length; i += maxLineLength) {
//     lines.push(message.substring(i, i + maxLineLength));
//   }

//   return (
//     <button
//       className={
//         "pr-5 flex max-w-[65%] rounded-md my-4 shadow-md" +
//         (sent
//           ? " border bg-blue-400 ml-auto mr-2 text-white"
//           : " border bg-gray-200 mr-auto ml-2 ")
//       }
//     >
//       <div className="flex flex-row h-20">
//         {sent}
//         {imageUrl && <img src={imageUrl} alt="Image" className="p-4 w-20" />}
//         <div>
//           <p className="font-bold text-xl">{userName}</p>
//           <div>
//             {lines.map((line, index) => (
//               <p key={index} className={"whitespace-pre-line " + (sent ? "text-white" : "text-gray-800")}>
//                 <i>{line}</i>
//               </p>
//             ))}
//           </div>
//         </div>
//       </div>
//     </button>
//   );
// };

// export default GroupMessageCard;
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const GroupMessageCard = ({ messageCard }) => {
    const { sent, userName, message, imageUrl } = messageCard;
  
    const maxLineLength = 35; // Change this to your desired length
    const lines = [];
  
    for (let i = 0; i < message.length; i += maxLineLength) {
      lines.push(message.substring(i, i + maxLineLength));
    }
  
    const buttonHeight = 40 + lines.length * 20; // Adjust the 20 as needed
  
    return (
      <button
        style={{ height: `${buttonHeight}px` }}
        className={
          "pr-5 flex max-w-[65%] rounded-md my-4 shadow-md" +
          (sent
            ? " border bg-blue-400 ml-auto mr-2 text-white"
            : " border bg-gray-200 mr-auto ml-2 ")
        }
      >
        <div className="flex flex-row h-full">
          {sent}
          {imageUrl && <img src={imageUrl} alt="Image" className="p-4 w-20 h-20" />}
          <div>
            <p className="font-bold text-xl">{userName}</p>
            <div>
              {lines.map((line, index) => (
                <p key={index} className={"whitespace-pre-line " + (sent ? "text-white" : "text-gray-800")}>
                  <i>{line}</i>
                </p>
              ))}
            </div>
          </div>
        </div>
      </button>
    );
  };
  
  export default GroupMessageCard;
  