//import React, { Component,useReducer } from 'react';
//import logo from './logo.svg';

import React,{ useReducer } from "react"
import Digitbutton from "./Digitbutton"
import "./style.css"
import OperationDigitbutton from "./OperationDigitbutton"

export const Action={
  ADD: "add-digit",
  ChooseOperation: "choose",
  CLEAR: "clear",
  DEL:"remove-one",
  Evaluate:"answer",
}



function reducer(state,{type,pass}){
  switch(type){
    case Action.ADD:
      if(state.overwrite){
        return {
          ...state,
          currentoperand: pass.digit,
          overwrite:false,
        }
      }
      if(pass.digit==="0" && state.currentoperand === "0") return state
      if(pass.digit==="." && state.currentoperand.includes(".")) return state
      return{
        ...state,
        currentoperand:`${state.currentoperand || ""}${pass.digit}`,
      }
    
    
    case Action.ChooseOperation:
      if(state.currentoperand==null && state.previousoperand==null){
        return state
      }

      if(state.currentoperand == null){
        return{
          ...state,
          operation:pass.operation,
        }
      }

      if(state.previousoperand==null){
        return{
          ...state,
          operation:pass.operation,
          previousoperand:state.currentoperand,
          currentoperand:null,
        }
      }
      return{
        ...state,
        previousoperand:answer(state),
        operation:pass.operation,
        currentoperand:null,
      }
    case Action.CLEAR:
      return {}

    case Action.DEL:
      if(state.overwrite){
        return{
          ...state,
          overwrite:false,
          currentoperand:null,
        }
      }
      if(state.currentoperand ==  null) return state
      if(state.currentoperand.length===1){
        return{...state,currentoperand:null}
      }

      return{
        ...state,
        currentoperand:state.currentoperand.slice(0,-1)
      }

    case Action.Evaluate:
      if(state.operation==null || state.currentoperand ==null
        || state.previousoperand==null){
          return state
        }
      return {
        ...state,
        overwrite:true,
        previousoperand: null,
        operation: null,
        currentoperand: answer(state),
      }

      default: break
      
  }

}

function answer({currentoperand,previousoperand,operation}){
  const prev = parseFloat(previousoperand)
  const curr = parseFloat(currentoperand)
  if(isNaN(prev) || isNaN(curr)) return ""
  let computation=""
  switch(operation){
    case "+":
      computation= prev+curr
      break
    case "-":
      computation= prev-curr
      break
    case "*":
      computation=prev*curr
      break
    case "÷":
      computation=prev / curr
      break
    default: break
    }
  
    return computation.toString()
}

//class App extends Component
const INTEGER_FORMATTER = new Intl.NumberFormat("en-us",{
  maximumFractionDigits:0,
})


function formatOperand(operand){
  if(operand == null) return
  const[integer, decimal]= operand.split(".")
  if(decimal== null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`

}


function App() {
  //render() {
    const[{currentoperand,previousoperand,operation},dispatch]=useReducer(reducer,
      {}
    )
    return (
      <div className="calculator-grid">
        <div className="output">
        <div className="previous-operand">
          {formatOperand(previousoperand)} {operation}
          </div>
          <div className="current-operand">{formatOperand(currentoperand)}</div>
        </div>
        <button className="span-two" onClick={()=> dispatch({type:Action.CLEAR})}>AC</button>
        <button onClick={()=> dispatch({type:Action.DEL})}>DEL</button>
        <OperationDigitbutton operation="÷" dispatch={dispatch}/>
        <Digitbutton digit="1" dispatch={dispatch}/>
        <Digitbutton digit="2" dispatch={dispatch}/>
        <Digitbutton digit="3" dispatch={dispatch}/>
        <OperationDigitbutton operation="*" dispatch={dispatch}/>
        <Digitbutton digit="4" dispatch={dispatch}/>
        <Digitbutton digit="5" dispatch={dispatch}/>
        <Digitbutton digit="6" dispatch={dispatch}/>
        <OperationDigitbutton operation="+" dispatch={dispatch}/>
        <Digitbutton digit="7" dispatch={dispatch}/>
        <Digitbutton digit="8" dispatch={dispatch}/>
        <Digitbutton digit="9" dispatch={dispatch}/>
        <OperationDigitbutton operation="-" dispatch={dispatch}/>
        <Digitbutton digit="." dispatch={dispatch}/>
        <Digitbutton digit="0" dispatch={dispatch}/>
        <button className="span-two" 
        onClick={()=> dispatch({type:Action.Evaluate})}>=</button>

      </div>
    );
  //}
}


  export default App
