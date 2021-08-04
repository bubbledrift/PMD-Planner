import './PopupAdd.css';
import AddPoke from "./AddPoke";

function PopupAdd(props) {

    const addPokeBody = (
        <div>
            <AddPoke
                setShowPopupAdd={props.setShowPopupAdd}
                setPokeToAdd={props.setPokeToAdd}
                popularity={props.popularity}
            />
        </div>
    )

    if (!props.showPopupAdd) {
        return <div/>;
    }
    return (
        <div className="PopupAdd">
            <div className="Popup-headerAdd">
                <div className="Popup-titleAdd">Add Pokémon</div>
                <button className="close" onClick={() => props.setShowPopupAdd(false)}/>
            </div>
            <div className="Popup-contentAdd">
                {addPokeBody}
            </div>
        </div>
    );

}

export default PopupAdd;