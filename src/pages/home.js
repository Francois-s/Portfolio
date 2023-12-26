import "./home.css"
import CardContainer from "../component/cardcontainer/cardcontainer"
import ProjectSection from "../component/projets/projet"
import SkillsComponent from "../component/skillscomponent/skillscomponent"
import ContactForm from "../component/contactform/contactform"
import { Parallax, ParallaxLayer } from '@react-spring/parallax'

export default function Home() {
    return (
        <>
            <Parallax pages={2} style={{ top: '0', left: '0' }} class="animation">
                <ParallaxLayer offset={0} speed={0.25}>
                    <div class="animation_layer parallax" id="artback"></div>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={-0.1}>
                    <div class="animation_layer parallax" id="logoland"></div>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={0.3}>
                    <div class="animation_layer parallax" id="jungle1"></div>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={0.35}>
                    <div class="animation_layer parallax" id="jungle2"></div>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={0.7}>
                    <div class="animation_layer parallax" id="jungle3"></div>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={0.45}>
                    <div class="animation_layer parallax" id="jungle4"></div>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={0.4}>
                    <div class="animation_layer parallax" id="jungle5"></div>
                </ParallaxLayer>
            </Parallax>
            <CardContainer />
            <ProjectSection />
            <SkillsComponent />
            <ContactForm />

        </>
    )
}