import React, {Component} from 'react';
import {injectGlobal} from 'styled-components';

import Login from "./views/Login";
import Welcome from "./components/ui/welcome/Welcome";

injectGlobal`
   body {
        margin: 0;
        padding: 0;
        background-color: #ffffff;
        font-family: "Open Sans", Helvetica;
        font-size: 14px;
   }
`;

class App extends Component {
    render() {
        return (
            <div className="App">
                <Login/>
                <Welcome/>
            </div>
        );
    }
}

export default App;