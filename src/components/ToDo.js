import { useReducer, useState } from "react";

const TYPES = {
    add: 'add',
    update: 'update',
    delete: 'delete'
}

const initialToDos = [
    { id: 1, title: 'ToDo #1'},
    { id: 2, title: 'ToDo #2'},
    { id: 3, title: 'ToDo #3'},
    { id: 4, title: 'ToDo #4'},
];

/* 
*   Función reducer 
*   Donde 'state' es el estado actual y 'action' es la accion que se efectuará 
*   posteriormente; tenemos 'action.type' donde es el tipo de accion, y 'action.payload'
*   donde es el parametro enviado desde la función DISPATCH, en este caso, una función.
*/
const reducer = (state, action) => {
    switch(action.type) {
        case TYPES.add:
            /* Retorna el estado actual del arreglo y se agrega al mismo un nuevo registro 'action.payload' */
            return [...state, action.payload ];
        case TYPES.delete:
            /* Retorna el estado, eliminando el registro cuyo id coincida con el parametro enviado en el 'action.payload' mediante la funcion filter() */
            return state.filter(todo => todo.id !== action.payload)
        case TYPES.update:
            return state.map(todo => todo.id === action.payload.id ? action.payload : todo)
        default:
            return state;
    }
}

const ToDo = () => {

    /* Uso del HOOK "useReducer" */
    const [todos, dispatch] = useReducer(reducer, initialToDos);

    /* 
    *   Uso del Hook "useState" 
    *   donde 'text' es el estado que se establece y
    *   'setText' es la funcion donde se estará actualizando el estado 'text'*   
    * */
    const [text, setText] =  useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTodo = { id: Date.now(), title: text} ;

        dispatch({ type: TYPES.add, payload: newTodo });
    }

    return (
        <div className="todoContainer">
            <h1 className="title"><code>To Do App</code></h1>
            <ul>
                {/* Iteración del arreglo en 'initialToDos', para ser renderizados utilizando la funcion map()*/}
                {todos.map(todo => (
                    /* Se utiliza una Key para identificarlo en el estado*/
                    <li className="list" key={todo.id}>
                        {todo.title}
                        {/* TYPE: Es el objeto de la accion a efectuar en el DISPATCH */}
                        {/* PAYLOAD es un parametro que se está enviando a DISPATCH */}
                        <div>
                            <button className="update" onClick={() => dispatch({ type: TYPES.update, payload: {...todo, title: text} })}>Update</button>
                            <button className="delete" onClick={() => dispatch({ type: TYPES.delete, payload: todo.id })}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            <form className="formContainer" onSubmit={handleSubmit}>
                <input placeholder="ToDo" value={text} onChange={e => { setText(e.target.value); }}/>
            </form>
        </div>
    );
};

export default ToDo;
