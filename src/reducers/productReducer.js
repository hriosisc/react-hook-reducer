import types from "../reducerTypes";

const initialProductState = {
    products: [
        { id: 1, title: 'Product #1'},
        { id: 2, title: 'Product #2'},
    ],
    cart: [
        { id: 1, title: 'Product #1', quantity: 1 }
    ],
    activeProduct: { id: 2, title: 'Product #2' },
}

const productReducer = (state, action) => {
    switch(action.type){
        // Retorna el estado actual, asi como también actualiza el producto activo al parametro enviado
        case types.show:
            return { ...state, activeProduct: action.payload }

        // Agrega producto a la lista 'cart'
        case types.add: {
            const newProduct = action.payload;
            const cartContainProduct = state.cart.find(prod => prod.id === newProduct.id)

            return cartContainProduct 
            ? { 
                ...state, 
                cart: state.cart.map(prod => 
                    prod.id === newProduct.id ? {...prod, quantity: prod.quantity + 1 } : prod 
                )
            }
            : { ...state, cart: [ ...state.cart, { ...action.payload , quantity: 1 }] }
        }
        // Remueve producto de la lista 'cart'
        case types.remove: {

            // Selecciona el producto del estado cuyo ID sea al 'action.payload' enviado
            const productDeleted = state.cart.find(prod => prod.id === action.payload);

            /*
            *   Condiciona, si la cantidad del producto seleccionado es mayor a 1
            *   entonces retorna el estado actual '...state' y actualiza 'cart' del estado
            *   condicionando si el id del producto es igual al ID enviado, removiendo -1
            *   en su cantidad
            */
            return productDeleted.quantity > 1 
            ? {
                ...state,
                cart: state.cart.map(prod => 
                    prod.id === action.payload ? {...prod, quantity: prod.quantity - 1} : prod
                )
            } 
            : {
                ...state,
                cart: state.cart.filter(prod => prod.id !== action.payload)
            }
        }

        // Caso 'RemoverTodo': retorna el estado actual y el objeto 'cart' cuyo id sea diferente al 'action.payload' enviado.
        case types.removeAll: 
             return { ...state, cart: state.cart.filter(prod => prod.id !== action.payload) }
        // Retorna el estado actual por default
        default:
            return state;
    }
}
export { initialProductState }
export default productReducer;