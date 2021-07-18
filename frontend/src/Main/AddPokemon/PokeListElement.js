import "./PokeListElement.css"


function PokeListElement(props) {

    /**
     * Example of what props.element is:
     "Number": "#001",
     "Name": "Bulbasaur",
     "Type 1": "Grass",
     "Type 2": "Poison",
     "Rescue Camp": "Beau Plains",
     "Final Evolution": "FALSE",
     "Popularity": 5
     */

    let spriteSrc = '/images/sprites/' + props.element.Name.toLowerCase() + '.png'

    let type1Src = '/images/types/' + props.element.Type1.toLowerCase() + '.gif'

    let type2Src = ''
    if (props.element.Type2 !== "") {
        type2Src = '/images/types/' + props.element.Type2.toLowerCase() + '.gif'
    }

    return (

        <div className="element">

            <div className='popularity'>
                {props.element.Popularity}
            </div>

            <div className="sprite">
                <img src={process.env.PUBLIC_URL + spriteSrc} alt={props.element.Name}/>
            </div>

            <div className="name">
                {props.element.Name}
            </div>

            {props.element.Type2 === "" &&
                <div className="typeBox1">
                    <img src={process.env.PUBLIC_URL + type1Src} alt={props.element.Type1}/>
                </div>
            }
            {props.element.Type2 !== "" &&
                <div className="typeBox2">
                    <div className="type1">
                        <img src={process.env.PUBLIC_URL + type1Src} alt={props.element.Type1}/>
                    </div>
                    <div className="type2">
                        {props.element.Type2 !== "" &&
                        <img src={process.env.PUBLIC_URL + type2Src} alt={props.element.Type2}/>
                        }
                    </div>
                </div>
            }

            <div className='campName'>
                {props.element.RescueCamp}
            </div>

        </div>
    )
}
export default PokeListElement