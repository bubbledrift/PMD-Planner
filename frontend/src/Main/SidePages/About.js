import {Link} from "react-router-dom";
import MyNavbar from "../MyNavbar";
import "./About.css"

function About() {

    let art = Math.floor(Math.random() * 6) + 1;

    return (
        <div id="AboutBackground" style={{
            backgroundImage: 'url("/images/art/' + art + '.png")',
            backgroundSize: 'contain'
        }}>

            <MyNavbar/>

            <div id='About'>
                <h1>About</h1>

                <p>
                    PMD Planner is a fan-made tool designed to help you plan your team for the game Pokémon
                    Mystery Dungeon Rescue Team DX for the Nintendo Switch. It started as a small project
                    to help me organize my own teams for the game. I'll continue to update the site with more
                    features and upgrades when I have time, and you can check out what's coming next in
                    the <Link to='/faq' id="FAQLink">FAQ</Link>.
                </p>

                <p>
                    I hope it's helpful to you and I hope you have a great time playing Pokemon RTDX!
                </p>


                <div id='disclaimer'>
                    Pokémon and All Respective Names and Images are Trademark & © of Nintendo 1996-{new Date().getFullYear()}
                </div>
            </div>


        </div>
    )
}

export default About