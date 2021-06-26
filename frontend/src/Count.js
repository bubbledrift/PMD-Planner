import React, {useState, useEffect} from "react";
import axios from "axios";
import {Button} from "react-bootstrap";

function Count() {

    const [toAdd, setToAdd] = useState(0);
    const [count, setCount] = useState(0);

    const handleChange = (e, setter) => {
        setter(e.target.value);
    }

    useEffect(() => {
        requestCount()
    }, []);

    /**
     * Makes an axios request to add a number to the count.
     */
    const requestCount = () => {
        console.log("toAdd: " + toAdd)

        const toSend = {
            toAdd: toAdd,
        };

        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        axios.post(
            "http://localhost:4567/count",
            toSend,
            config
        )
            .then(response => {
                console.log(response.data);
                setCount(response.data["count"])
            })

            .catch(function (error) {
                console.log(error.response);
            });

    }

    return (
        <div>
            <div>
                <h1 style={{color: "#f0eee9"}}>{count}</h1>
            </div>

            <div>
                <input
                    type="text"
                    id="toAdd"
                    placeholder="0"
                    style={{width: 200 + "px"}}
                    onChange={(e) => handleChange(e, setToAdd)}
                /><br/>

                <Button variant="outline-primary" onClick={requestCount}>Add</Button>
            </div>
        </div>

    )
}

export default Count;