import JSONDATA from './data/mockpmd.json'
import "./DataTable.css"
import {useState} from "react";
import ListElement from "./ListElement";

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
                }
            }).map((val, key) => {
                return (
                    <div className="dataEntry">
                        <ListElement element={val}/>
                    </div>
                )
            })}

        </div>
    )
}

export default DataTable;