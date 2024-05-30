
import './App.css';
import {BrowserRouter as Router,Routes,Route}from "react-router-dom";

import Register from "./components/register/Register";
import Login from "./components/login/Login";
import HomeHeader from "./components/homeheader/HomeHeader";
import {AuthProvider} from "./AuthContext";
import PrivateRoute from "./PrivateRoute";

import Sidebar from "./components/sidebar/Sidebar";
import Sidebar2 from "./components/sidebar/Sidebar2";
import Posts from "./components/posts/Posts";








function App() {
    return (
        <AuthProvider>
            <div className="App">
                <Router>
                    <Routes>
                        <Route path="/login"element={<Login/>}/>
                        <Route path="/register"element={<Register/>}/>


                        <Route
                            path="/home"
                            element={
                                <PrivateRoute>
                                    <HomeHeader></HomeHeader>
                                    <div className="app__page">
                                        <Sidebar/>
                                        <div className="app__posts">
                                            <Posts />
                                        </div>
                                        <Sidebar2/>
                                    </div>
                                </PrivateRoute>
                            }
                        />


                    </Routes>
                </Router>
            </div>
        </AuthProvider>
    );
}

export default App;