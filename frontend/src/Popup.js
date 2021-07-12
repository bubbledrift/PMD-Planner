import './Popup.css';
import React, {useState} from "react";
import AddPoke from "./AddPoke";

function Popup(props) {

    const addPokeBody = (
        <div>
            <AddPoke setShowPopup={props.setShowPopup} setPokeToAdd={props.setPokeToAdd}/>
        </div>
    )

    if (!props.showPopup) {
        return <div/>;
    }
    return (
        <div className="Popup">
            <div className="Popup-header">
                <div className="Popup-title">Add Pokemon</div>
                <button className="close" onClick={() => props.setShowPopup(false)}/>
            </div>
            <div className="Popup-content">
                {addPokeBody}
            </div>
        </div>
    );

}

export default Popup;