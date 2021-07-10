import {Button} from "react-bootstrap";
import "./Main.css"
import React, {useState} from "react";
import Popup from "./Popup";

function Main() {

    const [showPopup, setShowPopup] = useState(false);

    const addPokePopup = () => {
        setShowPopup(true);
    }

    return (
        <div>
            <div>
                <Popup showPopup={showPopup} setShowPopup={setShowPopup}/>
                <Button variant="secondary" className='AddPokeButton' onClick={addPokePopup}>
                    + Add Pokemon
                </Button>
            </div>
        </div>
    )

}

export default Main;