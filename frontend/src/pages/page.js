import { Outlet } from "react-router-dom";


import Navbar from "components/Navbar"

const Main = () => {
    return (
        <>
            <Navbar/>
            <div className="container d-flex flex-column h-100 fit-flex py-3">
                <Outlet/>
            </div>
        </>
    );
}

export default Main;