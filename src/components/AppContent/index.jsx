import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import JuliaDisplay from '../JuliaDisplay';
import About from "../About";
import Navbar from "../Navbar";
import Dashboard from "../Dashboard";

export default function AppContent() {
    return (
        <>
            <div className="app-content">
                <Router>
                    <Navbar />
                    <Switch>
                        <Route path='/' exact component={About} />
                        <Route path='/about' component={About} />
                        <Route path='/mint' component={JuliaDisplay} />
                        <Route path='/dashboard' component={Dashboard} />
                    </Switch>
                </Router>
            </div>
        </>
    )
}
// {
//                     <div className="title">
//                     <h1>Julia</h1>
//                     <hr width="30%" color="grey" />
//                 </div>
//                 <JuliaDisplay />
//                 <About />
// }
