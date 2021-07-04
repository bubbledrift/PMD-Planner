import JSONDATA from './data/mockpmd.json'
import "./DataTable.css"
import {useState} from "react";
import ListElement from "./ListElement";
import {Button} from "react-bootstrap";

function DataTable() {

    const [searchTerm, setSearchTerm] = useState('')

    return (
        <div className="MockData">
            <input
                type="text"
                placeholder="Search..."
                onChange={(event) => {
                    setSearchTerm(event.target.value)
                }}
            />

            {JSONDATA.filter((val) => {
                if (searchTerm == "") {
                    return val
                } else if (val.Name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val
                } //TODO: Add searching types and rescue camps if it doesn't impact performance
            }).map((val, key) => {
                return (
                    <div className="dataEntry">
                        <Button variant="secondary" block>
                            <ListElement element={val}/>
                        </Button>

                    </div>
                )
            })}

        </div>
    )
}

export default DataTable;