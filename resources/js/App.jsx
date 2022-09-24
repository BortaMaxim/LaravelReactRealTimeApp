import React from 'react'
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import store from "./redux/store";
import {BrowserRouter, Link} from "react-router-dom";
import {PublicRoutes} from "./routes/PublicRoutes";


function App(){
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Link to="/">Register</Link>
                    <Link to="/login">Login</Link>
                    <PublicRoutes />
                </div>
            </BrowserRouter>
        </Provider>
    )
}


export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
