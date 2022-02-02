import { useReducer } from "react";

// Objeto de tipo de acciones para el Hook useReducer
const TYPES = {
    INCREMENT: 'increment',
    DECREMENT: 'decrement',
    RESET: 'reset'
}

// Función 'reducer()'
const reducer = (state, action) => { 
    switch(action.type) {
        case TYPES.INCREMENT:
            return state + 1; 
        case TYPES.DECREMENT: 
            return state - 1; 
        case TYPES.RESET: 
            return 0;
        default:
            return state; 
    } 
}

const CounterApp = () => { 

    // HOOK: 'useReducer', es una función "pura"
    // Funcion 'dispatch', dispara acciones para actualizar nuestro estado 'state
    const [counter, dispatch] = useReducer(reducer, 0);
 
    /*  La funcion 'dispatch()' recibe una ACCION,
    *   la cual es un OBJETO, que contiene un TYPE
    *   y se indica que tipo de accion va a realizar,
    *   por ejemplo 'increment'
    */
    return (
        <div className="counterApp">            
            <h1 className="title"><code>Hook: useReduce</code></h1>
            <h1 className="counter">Clicks: [{counter}]</h1>        
            <button className="counterButton plus" onClick={() => dispatch({ type: TYPES.INCREMENT})}>Increment</button>
            <button className="counterButton minus" onClick={() => dispatch({ type: TYPES.DECREMENT})}>Decrement</button>
            <button className="counterButton reset" onClick={() => dispatch({ type: TYPES.RESET})}>Reset</button>
        </div>
    );
};

export default CounterApp;
