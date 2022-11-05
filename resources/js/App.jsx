import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min'
import 'react-toastify/dist/ReactToastify.css'
import '../css/app.css'
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import store from "./redux/store";
import {BrowserRouter} from "react-router-dom";
import {PublicRoutes} from "./routes/PublicRoutes";
import {Footer} from "./Components/Footer/Footer";
import {ToastContainer} from "react-toastify";


function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <>
                    <PublicRoutes/>
                    <ToastContainer/>
                    {/*<Footer/>*/}
                </>
            </BrowserRouter>
        </Provider>
    )
}


export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App/>, document.getElementById('root'));
}
