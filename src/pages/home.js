import "./home.css"
import Navbar from "../component/navbar/navbar"
import Hero from "../component/hero/hero"
import ProjectSection from "../component/projets/projet"
import Expertise from "../component/expertise/expertise"
import SkillsComponent from "../component/skillscomponent/skillscomponent"
import About from "../component/about/about"
import ContactForm from "../component/contactform/contactform"

export default function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <ProjectSection />
            <Expertise />
            <SkillsComponent />
            <About />
            <ContactForm />
        </>
    )
}
