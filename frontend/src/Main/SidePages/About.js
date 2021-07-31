import {Link} from "react-router-dom";
import MyNavbar from "../MyNavbar";

function About() {

    return (
        <div>

            <MyNavbar/>

            <h1>About</h1>
            <br/>
            <p>PMD Planner is a game where you can </p>

            <br/>
            <Link>
                Check out the FAQ
            </Link>
        </div>
    )
}

export default About