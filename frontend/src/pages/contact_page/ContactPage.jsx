import Navbar from "../../components/Navbar"
import ContactCard from "./ContactCard"

const ContactPage = () => {
    return (
        <div className="bg-[url('/src/assets/Background.jpg')] bg-cover bg-no-repeat bg-center min-h-screen bg-opacity-[80%] text-center">
        <Navbar/>
        <div className="flex flex-col justify-center items-center">
        <ContactCard imageUrl="/src/assets/Evan.jpg" description="Columbus, OH" name="Evan Kaczor" linkedIn="https://www.linkedin.com/in/evan-kaczor-777585293/" website="https://ekaczor.github.io/"/>
        <ContactCard imageUrl="/src/assets/emptyImage.webp" description="This is " name="" linkedIn="" website=""/>
        <ContactCard imageUrl="/src/assets/emptyImage.webp" description="Columbus, OH " name="Sebastian Alvarado" linkedIn="https://www.linkedin.com/in/sebastian-alvarado-5091a31b8/" website="https://alealvarado12.github.io/"/>
        <ContactCard imageUrl="/src/assets/emptyImage.webp" description="Cleveland, OH " name="Brogan Reed" linkedIn="https://www.linkedin.com/in/brogan-reed/" website="https://brogandr.github.io/"/>
        </div>
        </div>
    )
}

export default ContactPage