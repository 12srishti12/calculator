import React from "react"
import { Action } from "./App"

export default function Digitbutton({dispatch,digit}) {
    return (
        <button onClick={()=>dispatch({type:Action.ADD,pass: {digit}})}>
    {digit}
    </button>
    )
}