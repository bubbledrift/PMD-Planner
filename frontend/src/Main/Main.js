import "./Main.css"
import React, {useEffect, useRef, useState} from "react";
import {useInterval, useLocalStorage} from "./Helpers";
import PopupAdd from "./AddPokemon/PopupAdd";
import TeamBox from "./TeamBox";
import PopupUndo from "./PopupUndo";
import PopupEdit from "./EditPokemon/PopupEdit";
import MyNavbar from "./MyNavbar";
import axios from "axios";
import {Link} from "react-router-dom";


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
        axios.get(process.env.REACT_APP_API_URL + "/getPopularity")
            .then(response => {
                setPopularity(response.data["byPopular"])
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }

    //Keeps track of the recently added pokemon to send back to our backend to calculate most popular pokemon.
    const recentlyAddedRef = useRef([])
    let recentlyAdded = recentlyAddedRef.current;

    useEffect(() => {
        if (pokeToAdd !== null) {
            recentlyAdded.push(pokeToAdd.Number)
        }
    }, [pokeToAdd, recentlyAdded])

    //Sends a list of pokemon added to the backend for it to update popularity.
    const sendPopularity = () => {
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
            process.env.REACT_APP_API_URL  + "/updatePopularity",
            toSend,
            config
        )
            .then(response => {
                recentlyAdded = [];
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }

    useInterval(sendPopularity, 60000)

    //Stops scrolling when in a popup.
    useEffect(() => {
        if (showPopupAdd === true || showPopupEdit === true) {
            document.documentElement.style.overflowY = 'hidden';
        } else {
            document.documentElement.style.overflowY = 'scroll';
        }
    }, [showPopupAdd, showPopupEdit])

    let teams = [];
    for (let i = 1; i < 10; i++) {
        teams.push(i);
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

            <div id='instructions'>

                <h1>How to Use</h1>

                <p>
                    Welcome to PMD Planner, a tool designed to help you plan your Pokémon Rescue Team DX adventure.
                </p>

                <ul>
                    <li>To get started, click on an <b>Add Pokémon</b> button to add a pokémon in that spot.</li>
                    <li>Then, you'll be able to search for and pick a pokémon that you want on your team.</li>
                    <li>Once you've picked a pokémon, you can click on the pokémon to edit its properties.</li>
                    <li>To delete a pokémon, simply click on the Trash icon on each pokémon.</li>
                    <li>Also, you can edit team names to your liking.</li>
                </ul>

                <p>
                    Check out the <Link to='/faq' id="FAQLink">FAQ</Link> for some more information.
                </p>
            </div>

            <div id='teams'>
                {teams.map((teamNum) => {
                    return <TeamBox
                        setShowPopupAdd={setShowPopupAdd}
                        setDestinationBox={setDestinationBox}
                        destinationBox={destinationBox}
                        pokeToAdd={pokeToAdd}
                        setPokeToAdd={setPokeToAdd}
                        teamNumber={teamNum}
                        setShowUndo={setShowUndo}
                        showPopupEdit={showPopupEdit}
                        setShowPopupEdit={setShowPopupEdit}
                        pokeToEdit={pokeToEdit}
                        setPokeToEdit={setPokeToEdit}
                        lastDeleted={lastDeleted}
                        setLastDeleted={setLastDeleted}
                        deletedBox={deletedBox}
                        setDeletedBox={setDeletedBox}
                        undo={undo}
                        key={teamNum}
                    />
                })}
            </div>

        </div>
    )

}

export default Main;