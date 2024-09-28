import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Landing from "../../pages/Landing";
import Employees from "../../pages/Employees";
import Header from "../Header";


function AppRouter () {

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/employees" element={<Employees />} />
            </Routes>
        </Router>
    )
}


export default AppRouter;