import MyNavbar from "../MyNavbar";
import './faq.css'

function faq() {

    let art = Math.floor(Math.random() * 6) + 1;

    return (
        <div id="FAQBackground" style={{
            backgroundImage: 'url("/images/art/' + art + '.png")',
            backgroundSize: 'contain'
        }}>

            <MyNavbar/>

            <div id='faq'>
                <h1>FAQ</h1>
                <br/>

                <h2>What is PMD Planner?</h2>

                <h2>How do I use PMD Planner?</h2>

                <h2>Are you planning to add other PMD games like Explorers of Sky?</h2>

                <h2>What's next?</h2>

                <h2>Where is the data from?</h2>

                <h2>How is pokemon popularity calculated?</h2>
            </div>




        </div>
    )
}

export default faq