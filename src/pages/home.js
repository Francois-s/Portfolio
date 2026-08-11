import "./home.css"
import Navbar from "../component/navbar/navbar"
import Hero from "../component/hero/hero"
import ProjectSection from "../component/projets/projet"
import Expertise from "../component/expertise/expertise"
import SkillsComponent from "../component/skillscomponent/skillscomponent"
import CareerGame from "../component/careergame/careergame"
import ContactCard from "../component/contactcard/contactcard"

export default function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <ProjectSection />
            <Expertise />
            <SkillsComponent />
            <CareerGame />
            <ContactCard />
        </>
    )
}
