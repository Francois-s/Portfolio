import "./home.css"
import Navbar from "../component/navbar/navbar"
import CardContainer from "../component/cardcontainer/cardcontainer"
import ProjectSection from "../component/projets/projet"
import SkillsComponent from "../component/skillscomponent/skillscomponent"
import MyParallax from "../component/myparallax/myparallax"

export default function Home() {
    return (
        <>
            <Navbar />
            <MyParallax />
            <ProjectSection />
            <SkillsComponent />
            <CardContainer />

        </>
    )
}