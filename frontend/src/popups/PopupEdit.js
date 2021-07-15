import './PopupEdit.css';

function PopupEdit(props) {

    const addEditBody = (
        <div>

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