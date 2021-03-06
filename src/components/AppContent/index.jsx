import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import JuliaDisplay from '../JuliaDisplay';
import SoundboxDisplay from '../SoundboxDisplay';
import About from "../About";
import Navbar from "../Navbar";
import Dashboard from "../Dashboard";

export default function AppContent() {
    const prefix = '/'
    return (
      <>
        <div className="app-content">
          <Router>
            <Navbar />
            <Switch>
              <Route path={prefix} exact component={JuliaDisplay} />
              <Route path={prefix + "about"} component={About} />
              <Route path={prefix + "mint"} component={JuliaDisplay} />
              <Route path={prefix + "soundbox"} component={SoundboxDisplay} />
              <Route path={prefix + "dashboard"} component={Dashboard} />
            </Switch>
          </Router>
        </div>
      </>
    );
}
// {
//                     <div className="title">
//                     <h1>Julia</h1>
//                     <hr width="30%" color="grey" />
//                 </div>
//                 <JuliaDisplay />
//                 <About />
// }
