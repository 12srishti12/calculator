import React from "react"
import {Action} from "./App"

export default function OperationDigitbutton({dispatch,operation}){
    return (
        <button 
        onClick={()=>dispatch({type:Action.ChooseOperation,pass: {operation}})
    }
    >
    {operation}
    </button>
    )
}