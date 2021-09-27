import React from 'react'

import JuliaDisplay from '../JuliaDisplay';
import About from "../About";

export default function AppContent() {
    return (
        <>
            <div className="app-content">
                <div className="title">
                    <h1>Julia</h1>
                    <hr width="30%" color="grey" />
                </div>
                <JuliaDisplay />
                <About />
            </div>
        </>
    )
}
