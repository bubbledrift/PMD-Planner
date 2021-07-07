import JSONDATA from './data/mockpmd.json'
import {useState} from "react";
import ListElement from "./ListElement";
import {Button, ButtonGroup} from "react-bootstrap";
import "./DataTable.css"


function DataTable() {

    const [searchTerm, setSearchTerm] = useState('')
    const [sortState, setSortState] = useState('Pokemon')

    let results = JSONDATA.filter((val) => {
        if (searchTerm == "") {
            return val
        } else if (val.Name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return val
        } //TODO: Add searching types and rescue camps if it doesn't impact performance
    })

    let headerLabels = ['Popularity','Pokemon','Type','Rescue Camp']

    results.sort(function(a, b){

        for (let i = 0; i < headerLabels.length; i++) {
            if (headerLabels[i].includes("▼") || headerLabels[i].includes("▲")) {
                headerLabels[i] = headerLabels[i].substring(0, headerLabels[i].length - 2)
            }
        }

        if (sortState === 'Pokemon') {
            //Sort by pokedex
            headerLabels[1] = headerLabels[1].concat(" ▼")
            return b.Number > a.Number ? -1 : 1
        } else if (sortState === 'PokemonRev') {
            headerLabels[1] = headerLabels[1].concat(" ▲")
            //Sort by reverse pokedex
            return a.Number > b.Number ? -1 : 1

        } else if (sortState === 'Popular') {
            headerLabels[0] = headerLabels[0].concat(" ▼")
            //Sort by most popular
            return a.Popularity - b.Popularity
        } else if (sortState === 'PopularRev') {
            headerLabels[0] = headerLabels[0].concat(" ▲")
            //Sort by least popular
            return b.Popularity - a.Popularity

        } else if (sortState === 'Type') {
            headerLabels[2] = headerLabels[2].concat(" ▼")
            //Sort by type 1
            return b.Type1 > a.Type1 ? -1 : 1
        } else if (sortState === 'TypeRev') {
            headerLabels[2] = headerLabels[2].concat(" ▲")
            //Sort by type 1
            return a.Type1 > b.Type1 ? -1 : 1

        } else if (sortState === 'Camp') {
            headerLabels[3] = headerLabels[3].concat(" ▼")
            //Sort by Rescue Camp
            return b.RescueCamp > a.RescueCamp ? -1 : 1
        } else if (sortState === 'CampRev') {
            headerLabels[3] = headerLabels[3].concat(" ▲")
            //Sort by Rescue Camp
            return a.RescueCamp > b.RescueCamp ? -1 : 1
        }
    });

    /**
     * BUTTON ONCLICK HANDLERS
     */
    const popularityClick = () => {
        if (sortState === 'Popular') {
            setSortState('PopularRev')
        } else {
            setSortState('Popular')
        }
    }

    const pokemonClick = () => {
        if (sortState === 'Pokemon') {
            setSortState('PokemonRev')
        } else {
            setSortState('Pokemon')
        }
    }

    const typeClick = () => {
        if (sortState === 'Type') {
            setSortState('TypeRev')
        } else {
            setSortState('Type')
        }
    }

    const campClick = () => {
        if (sortState === 'Camp') {
            setSortState('CampRev')
        } else {
            setSortState('Camp')
        }
    }

    return (
        <div className="MockData">
            <input
                type="text"
                placeholder="Search..."
                onChange={(event) => {
                    setSearchTerm(event.target.value)
                }}
            />

            <div>
                <ButtonGroup className='Header'>
                    <Button variant="secondary" className='HeaderButton' onClick={popularityClick}>
                        {headerLabels[0]}
                    </Button>
                    <Button variant="secondary" className='HeaderButton' onClick={pokemonClick}>
                        {headerLabels[1]}
                    </Button>
                    <Button variant="secondary" className='HeaderButton' onClick={typeClick}>
                        {headerLabels[2]}
                    </Button>
                    <Button variant="secondary" className='HeaderButton' onClick={campClick}>
                        {headerLabels[3]}
                    </Button>
                </ButtonGroup>


                <div className="Results">
                    {results.map((val, key) => {
                        return (
                            <div className="listElement">
                                <Button style={{padding: '0px', border: '0px'}} variant="secondary" block>
                                    <ListElement element={val}/>
                                </Button>
                            </div>
                        )
                    })}
                </div>
            </div>


        </div>
    )
}

export default DataTable;