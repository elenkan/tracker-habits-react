import React from 'react';
import ReactDOM from 'react-dom';
import CreateHabitForm from "./components/CreateHabitForm";
import HabitsList from "./components/HabitsList";
import HomePage from "./components/HomePage";
import ProgressList from "./components/ProgressList";
import SettingsPage from "./components/SettingsPage"
import Header from "./components/Header";
import "./index.scss"
import {BrowserRouter, Routes, Route} from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <div className="content">
                <Header/>
                <Routes>
                    <Route path="/"
                           element={<HomePage/>}/>
                    <Route
                        path="/create-habit"
                        element={<CreateHabitForm/>}/>
                    <Route path="/habits-list"
                           element={<HabitsList/>}/>
                    <Route path="/progress"
                           element={<ProgressList/>}/>
                    <Route path="/settings"
                           element={<SettingsPage/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
};

ReactDOM.render(<App/>, document.getElementById('root'));