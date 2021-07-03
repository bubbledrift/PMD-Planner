import "./ListElement.css"


function ListElement(props) {

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

    let start = "./data/sprites/"
    let lowercaseName = props.element.Name.toLowerCase()
    let end = ".png"
    let src = start.concat(lowercaseName.concat(end))

    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    const images = importAll(require.context('./data/sprites', false, /\.(png|jpe?g|svg)$/));
    console.log(images[lowercaseName + end])

    return (
        <div className="element">
            <div>
                <img src={images[lowercaseName + end]}/>
            </div>

            <div>
                {props.element.Name}
            </div>

            <div>
                {props.element.RescueCamp}
            </div>
        </div>
    )
}
export default ListElement