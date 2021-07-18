import './PopupEdit.css';
import EditPoke from "./EditPoke";

function PopupEdit(props) {

    const addEditBody = (
        <div>
            <EditPoke
                pokeToEdit={props.pokeToEdit}
                setPokeToEdit={props.setPokeToEdit}
                setShowPopupEdit={props.setShowPopupEdit}
            />
        </div>
    )

    if (!props.showPopupEdit) {
        return <div/>;
    }

    return (
        <div className="PopupEdit">
            <div className="Popup-headerEdit">
                <div className="Popup-titleEdit">Edit Pokemon</div>
                <button className="close" onClick={() => props.setShowPopupEdit(false)}/>
            </div>
            <div className="Popup-contentEdit">
                {addEditBody}
            </div>
        </div>
    );

}

export default PopupEdit;