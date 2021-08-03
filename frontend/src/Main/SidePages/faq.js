import MyNavbar from "../MyNavbar";
import './faq.css'
import React from "react";

function faq() {

    let art = Math.floor(Math.random() * 6) + 1;

    return (
        <div id="FAQBackground" style={{
            backgroundImage: 'url("/images/art/' + art + '.png")',
            backgroundSize: 'contain'
        }}>

            <MyNavbar/>

            <div id='faq'>
                <h1>FAQ</h1>

                <p className='Question'>
                    Are there any plans to make planners for the other Pokémon Mystery Dungeon games?
                </p>

                <p>
                    Not currently.
                </p>

                <p className='Question'>How is pokémon popularity determined?</p>

                <p>
                    Pokémon popularity is based off of how many people on this site have added a certain pokémon
                    to one of their teams.
                </p>

                <p className='Question'>Where is the data from?</p>

                <ul>
                    <li>
                        Pokémon sprites from&#160;
                        <a className='link'
                           href="https://pokemondb.net/"
                           target="_blank" rel='noreferrer'>Pokemon Database</a>.
                    </li>

                    <li>
                        RTDX portraits from&#160;
                        <a className='link'
                           href="https://www.serebii.net/dungeonrescueteamdx/pokemon.shtml"
                           target="_blank" rel='noreferrer'>Serebii</a>.
                    </li>

                    <li>
                        Move data from&#160;
                        <a className='link'
                           href="https://gamewith.net/pokemon-mystery-dungeon-dx/article/show/16215"
                           target="_blank" rel='noreferrer'>GameWith</a>.
                    </li>
                    <li>
                        Pokémon, Rare Quality, and Item data from&#160;
                        <a className='link'
                           href="https://www.serebii.net/dungeonrescueteamdx/pokemon.shtml"
                           target="_blank" rel='noreferrer'>Serebii</a>.
                    </li>
                    <li>
                        Background images from&#160;
                        <a className='link'
                           href="https://pokemon.gamespress.com/Pokemon-Mystery-Dungeon-Rescue-Team-DX/Focus/Mystery-Dungeon-Artwork"
                           target="_blank" rel='noreferrer'>here</a>.
                    </li>
                </ul>

                <p className='Question'>What's next?</p>

                <p>
                    There are a lot of things that I'd like to add to the site, but the most important things are
                    probably:
                </p>

                <ul>
                    <li>Making the site more mobile friendly.</li>
                    <li>Adding tooltips with descriptions and info to moves, items, and rare qualities.</li>
                    <li>Limiting move options to only moves that the pokémon can learn in game.</li>
                </ul>

            </div>




        </div>
    )
}

export default faq