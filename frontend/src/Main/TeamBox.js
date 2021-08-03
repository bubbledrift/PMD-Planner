import PokemonBox from "./PokemonBox";
import "./TeamBox.css"
import {useLocalStorage} from "./Helpers";

function TeamBox(props) {

    let boxes = [];
    for (let i = 1; i < 4; i++) {
        boxes.push(
            props.teamNumber * 10 + i
        );
    }

    const [teamName, setTeamName] = useLocalStorage(props.teamNumber,"Team " + props.teamNumber)

    return (
        <div className='TeamBox'>
            <div className='BoxHeader'>
                <input
                    className="TeamName"
                    type="text"
                    placeholder={"Team " + props.teamNumber}
                    value={teamName}
                    maxLength="20"
                    onChange={(event) => {
                        setTeamName(event.target.value)
                    }}
                    style={{width: 80 + 12 * teamName.length + "px"}}
                />

            </div>

            <div className='Pokemon'>
                {boxes.map((boxNum) => {
                    return <PokemonBox
                        setShowPopupAdd={props.setShowPopupAdd}
                        setDestinationBox={props.setDestinationBox}
                        destinationBox={props.destinationBox}
                        pokeToAdd={props.pokeToAdd}
                        setPokeToAdd={props.setPokeToAdd}
                        boxNumber={boxNum}
                        setShowUndo={props.setShowUndo}
                        showPopupEdit={props.showPopupEdit}
                        setShowPopupEdit={props.setShowPopupEdit}
                        pokeToEdit={props.pokeToEdit}
                        setPokeToEdit={props.setPokeToEdit}
                        lastDeleted={props.lastDeleted}
                        setLastDeleted={props.setLastDeleted}
                        deletedBox={props.deletedBox}
                        setDeletedBox={props.setDeletedBox}
                        undo={props.undo}
                        key={boxNum}
                    />
                })}
            </div>


        </div>
    )
}

export default TeamBox