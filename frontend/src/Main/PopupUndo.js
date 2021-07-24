import './PopupUndo.css';
import {Button} from "react-bootstrap";
import React from "react";

function PopupUndo(props) {

    const reAddPoke = () => {
        if (props.undo === false) {
            props.setUndo(true)
        } else {
            props.setUndo(false)
        }
        props.setShowUndo(false)
    }

    let displayName = ''
    if (props.lastDeleted !== null) {
        displayName = props.lastDeleted.Nickname
        if (displayName === '') {
            displayName = props.lastDeleted.Name
        }
    }


    if (!props.showUndo) {
        return <div/>;
    }
    return (
        <div className="PopupUndo">

            <div className="DeletedText">
                Deleted
            </div>

            <div className="PokeName">
                {displayName}
            </div>

            <button className="close-Undo" onClick={() => props.setShowUndo(false)}/>

            <div>
                <Button variant="dark" className='UndoButton' onClick={reAddPoke}>
                    <div className="UndoText">
                        Undo?
                    </div>
                </Button>
            </div>


        </div>
    );

}

export default PopupUndo;