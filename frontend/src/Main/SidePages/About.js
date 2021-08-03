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
                    PMD Planner is a tool designed to help you plan your team for the game Pokémon Mystery Dungeon
                    Rescue Team DX for the Nintendo Switch. It started as a passion project when I was tired of how
                    disorganized it was to try planning a team in a text document. I hope it's helpful to you and
                    I hope you have a great time playing Pokemon RTDX!
                </p>


                Check out the <Link to='/faq' id="FAQLink">FAQ</Link> for some more information.

                <br/>

                <div id='disclaimer'>
                    Pokémon and All Respective Names and Images are Trademark & © of Nintendo 1996-{new Date().getFullYear()}
                </div>
            </div>


        </div>
    )
}

export default About