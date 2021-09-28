import React, { useContext } from 'react'

import { generate } from 'shortid'
import { AppDispatchContext, AppStateContext } from '../App/AppStateProvider'

const P5Wrapper = p5Wrapper(generate())

export default function ConnectWallet() {
    const dispatch = useContext(AppDispatchContext)
    const {
        address
    } = useContext(AppStateContext)

    return (
        <div className="wrapper">
            <p>Please connect to your wallet.</p>
            <div className="inputs-wrapper">
                <button
                    className="btn btn-warning"
                    type="button"
                    onClick={() => {
                        // Connect wallet
                    }
                    }
                >
                    Refresh
                </button>
            </div>
        </div>
    )
}
