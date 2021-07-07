import JSONDATA from './data/mockpmd.json'
import "./DataTable.css"
import {useState} from "react";
import ListElement from "./ListElement";
import {Button, ButtonGroup} from "react-bootstrap";

function DataTable() {

    const [searchTerm, setSearchTerm] = useState('')

    let results = JSONDATA.filter((val) => {
        if (searchTerm == "") {
            return val
        } else if (val.Name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return val
        } //TODO: Add searching types and rescue camps if it doesn't impact performance
    })

    results.sort(function(a, b){
        //Sort by most popular

        return b.Popularity - a.Popularity;
        //Sort by least popular
        // return a.Popularity - b.Popularity;
        //Sort by pokedex
        // return a.Number - b.Number
        //Sort by reverse pokedex
        // return b.Number - a.Number
        //Sort by type 1
        // return b.Type1 - a.Type1
        //Sort by Rescue Camp
        // return b.RescueCamp - a.RescueCamp
    });


    return (
        <div className="MockData">
            <input
                type="text"
                placeholder="Search..."
                onChange={(event) => {
                    setSearchTerm(event.target.value)
                }}
            />

            <ButtonGroup className='Header'>
                <Button variant="secondary" className='HeaderButton'>Popularity ▼</Button>
                <Button variant="secondary" className='HeaderButton'>Pokemon ▲</Button>
                <Button variant="secondary" className='HeaderButton'>Type ▲</Button>
                <Button variant="secondary" className='HeaderButton'>Rescue Camp ▲</Button>
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
    )
}

export default DataTable;