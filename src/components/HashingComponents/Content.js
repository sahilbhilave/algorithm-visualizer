import './css/content.css'
// eslint-disable-next-line
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';

function Content() {

    return (
        <div >
            <h2 id="title">Chaining</h2>
            <p id="function">Position = (Element + i) % Size</p>
            {/* <b id="credit">--Developed By Sahil Bhilave--</b> */}
            
            <Link to="/home">
                <div id="nav">

                    Back

                </div>
            </Link>

            <p id="size">15</p>
            <input type="checkbox" id="toggle"></input>
            <label for="toggle">Toggle Steps</label>
            <div class="content" id="content">
                <p id="calc"></p>
            </div>
            <hr />

            <p id="result"></p>

        </div>
    );
}

export default Content;