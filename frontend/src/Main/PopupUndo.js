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

    const undoBody = (
        <div>
            <Button variant="secondary" className='UndoButton' onClick={reAddPoke}>
                Undo
            </Button>
        </div>
    )

    if (!props.showUndo) {
        return <div/>;
    }
    return (
        <div className="PopupUndo">
            <div className="Popup-headerUndo">
                <div className="Popup-titleUndo">You deleted ...</div>
                <button className="close" onClick={() => props.setShowUndo(false)}/>
            </div>
            <div className="Popup-contentUndo">
                {undoBody}
            </div>
        </div>
    );

}

export default PopupUndo;