import "./Main.css"
import React, {useEffect, useRef, useState} from "react";
import {useInterval, useLocalStorage} from "./Helpers";
import PopupAdd from "./AddPokemon/PopupAdd";
import TeamBox from "./TeamBox";
import PopupUndo from "./PopupUndo";
import PopupEdit from "./EditPokemon/PopupEdit";
import MyNavbar from "./MyNavbar";
import axios from "axios";


function Main() {

    //Booleans that determine if popups should be rendered or not.
    const [showPopupAdd, setShowPopupAdd] = useState(false);
    const [showUndo, setShowUndo] = useState(false);
    const [showPopupEdit, setShowPopupEdit] = useState(false);

    /**
     * When adding pokemon, we need to know what pokemon to add and where to add it.
     */
    const [pokeToAdd, setPokeToAdd] = useState(null)
    const [destinationBox, setDestinationBox] = useState(0)

    /**
     * When editing pokemon, we need to hold that pokemon's info to put into the popup.
     */
    const [pokeToEdit, setPokeToEdit] = useState(null)

    //Keeps track of the last deleted pokemon to re-add if the user undoes the deletion.
    const [lastDeleted, setLastDeleted] = useState(null)
    //Keeps track of the box location of the last deleted pokemon
    const [deletedBox, setDeletedBox] = useState(0)
    //A boolean switch that is switched when the last deleted pokemon should be re-added.
    const [undo, setUndo] = useState(false)

    //Stores a list of pokemon and how popular they are.
    const [popularity, setPopularity] = useLocalStorage("Popularity", [])
    //Stores the most recent update to our popularity list.
    const [lastUpdate, setLastUpdate] = useLocalStorage("LastUpdated", 0)


    // Upon first loading, update the popularity if it isn't stored in local storage.
    // If it's stored in local storage, update only if enough time has passed.
    useEffect(() => {
        let time = new Date().getTime()

        if (popularity === []) {
            //Send a request to the backend to set our popularity.
            getPopularity()
            //Set the last update to the current date.
            setLastUpdate(time)
        } else if (lastUpdate + 43200000 < time) {
            //If it's been more than 12 hours since the last update, we ask the backend for another update.
            getPopularity()
            //Set the last update to the current date.
            setLastUpdate(time)
        }
    })

    const getPopularity = () => {
        axios.get("http://localhost:4567/getPopularity")
            .then(response => {
                setPopularity(response.data["byPopular"])
            })
            .catch(function (error) {
                console.log(error.response);
            });
        console.log(popularity)
    }


    const recentlyAddedRef = useRef([])
    let recentlyAdded = recentlyAddedRef.current;

    useEffect(() => {
        if (pokeToAdd !== null) {
            recentlyAdded.push(pokeToAdd.Number)
            console.log(recentlyAdded)
        }
    }, [pokeToAdd])

    //Sends a list of pokemon added to the backend for it to update popularity.
    const sendPopularity = () => {
        console.log(recentlyAdded)
        const toSend = {
            toIncrement: recentlyAdded
        };

        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        axios.post(
            "http://localhost:4567/updatePopularity",
            toSend,
            config
        )
            .then(response => {
                recentlyAdded = [];
                console.log(recentlyAdded)
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }

    useInterval(sendPopularity, 60000)



    let teams = [];
    for (let i = 1; i < 10; i++) {
        teams.push(
            <TeamBox
                setShowPopupAdd={setShowPopupAdd}
                setDestinationBox={setDestinationBox}
                destinationBox={destinationBox}
                pokeToAdd={pokeToAdd}
                setPokeToAdd={setPokeToAdd}
                teamNumber={i}
                setShowUndo={setShowUndo}
                setShowPopupEdit={setShowPopupEdit}
                pokeToEdit={pokeToEdit}
                setPokeToEdit={setPokeToEdit}
                lastDeleted={lastDeleted}
                setLastDeleted={setLastDeleted}
                deletedBox={deletedBox}
                setDeletedBox={setDeletedBox}
                undo={undo}
            />
        );
    }

    return (
        <div id='main' style={{
            backgroundImage: 'url("/images/art/map.png")',
            backgroundSize: 'contain'
        }}>
            <PopupAdd
                showPopupAdd={showPopupAdd}
                setShowPopupAdd={setShowPopupAdd}
                setPokeToAdd={setPokeToAdd}
                popularity={popularity}
            />
            <PopupUndo
                showUndo={showUndo}
                setShowUndo={setShowUndo}
                undo={undo}
                setUndo={setUndo}
                lastDeleted={lastDeleted}
            />
            <PopupEdit
                showPopupEdit={showPopupEdit}
                setShowPopupEdit={setShowPopupEdit}
                pokeToEdit={pokeToEdit}
                setPokeToEdit={setPokeToEdit}
            />

            <MyNavbar/>

            <div id='teams'>{teams}</div>
        </div>
    )

}

export default Main;