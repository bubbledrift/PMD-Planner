import JSONDATA from './data/MOCK_DATA.json'
import "./DataTable.css"
import {useState} from "react";

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
                } else if (val.Pokemon.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val
                }
            }).map((val, key) => {
                return (
                    <div className="dataEntry">
                        {val.Pokemon}
                    </div>
                )
            })}

        </div>
    )
}

export default DataTable;