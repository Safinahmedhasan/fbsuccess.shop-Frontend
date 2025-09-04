import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Header from "../Home/Header";

const Main = () => {
    return (
        <div>
            {/* <Navbar/> */}
            <Header/>
            <Outlet/>
        </div>
    );
};

export default Main;