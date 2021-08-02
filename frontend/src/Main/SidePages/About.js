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
                    PMD Planner is a game where you can tool to help people plan their teams. it started as...
                    contactme here if you have comments or suggestions, but it is sjust a passion project so no guarantees
                    on new features.

                    PMD Planner is a tool designed to help you plan your team for the game Pokémon Mystery Dungeon Rescue
                    Team DX for the Nintendo Switch. I started the project because I was tired of how disorganized trying to
                    plan a team in a text document was.

                </p>


                Check out the <Link to='/faq'>FAQ</Link>

                <br/>

                <div id='disclaimer'>
                    Pokémon and All Respective Names and Images are Trademark & © of Nintendo 1996-{new Date().getFullYear()}
                </div>
            </div>


        </div>
    )
}

export default About