/* eslint-disable react/prop-types */
const ContactCard = ({imageUrl, description, name, linkedIn, website}) => {

    return(
        <div className="flex bg-[#ffffff55] backdrop-blur box-border border-white border-[2px] p-4 shadow-md mt-10 w-[80vw] max-w-[800px] rounded-md">
            <img src={imageUrl} alt={name} className="rounded-full w-40 h-40"/>
            <div>
                <div className="font-bold text-3xl p-2 text-white">{name}</div>
                <div className="text-lg text-white">{description}</div>
            </div>
            <div className="flex flex-col ml-auto mt-auto">
            <a href={linkedIn} className="bg-violet-700 text-white py-2 px-4 rounded-md hover:bg-violet-950 transition-transform transform-gpu hover:scale-105 m-5">LinkedIn</a>
            <a href={website} className="bg-violet-700 text-white py-2 px-4 rounded-md hover:bg-violet-950 transition-transform transform-gpu hover:scale-105 m-5">Website</a>
            </div>
        </div>
    )
}

export default ContactCard;