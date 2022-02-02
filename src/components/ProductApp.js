import { useReducer } from "react";
// Importación de funcion reducer y estado 'initialProductState'
import productReducer, { initialProductState } from "../reducers/productReducer";
// Importación de tipos de accion reducer
import types from "../reducerTypes";

const ProductApp = () => {
    
    const [productState, productDispatch] = useReducer(productReducer, initialProductState);
    const { products, cart, activeProduct } = productState;

    return (
        <div className="productsContainer">
            <h1 className="title"><code>Products</code></h1>
            <ul>
                {/* Iteracion del arreglo 'products' para ser renderizado utilizando la funcion map()*/}
                {
                    products.map(prod => (
                        <li key={prod.id}>
                            {prod.title}
                            {/* Ejecuta la funcion 'productDispatch' enviando el objeto con la accion 'type' y parametro 'payload'*/}
                            <div>
                                <button className="show" onClick={() => productDispatch( { type: types.show, payload: prod } )}>
                                    Show 
                                </button>
                                {/* Ejecuta la funcion 'productDispatch' enviando el objeto con la accion 'type' y parametro 'payload'*/}
                                <button  className="addTo" onClick={() => productDispatch( { type: types.add, payload: prod } )}>
                                    Add to Cart
                                </button>
                            </div>
                        </li>
                    ))
                } 
            </ul>

            <h1 className="title"><code>Cart</code></h1>
            <ul> 
                {/* Iteracion del arreglo 'Cart' para ser renderizado  utilizando la funcion map()*/}
                {
                    cart.map(prod => (
                        <li key={prod.id}>
                            {prod.title} - quantity: { prod.quantity }
                            {/* Ejecuta la funcion 'productDispatch' enviando el objeto con la accion 'type' y ID como parametro 'payload'*/}
                            <div>
                                <button className="remove" onClick={() => productDispatch( { type: types.remove, payload: prod.id } )}>
                                    Remove to Cart
                                </button>
                                {/* Ejecuta la funcion 'productDispatch' enviando el objeto con la accion 'type' y ID como parametro 'payload'*/}
                                <button className="removeAll" onClick={() => productDispatch( { type: types.removeAll, payload: prod.id } )}>
                                    Remove All
                                </button>
                            </div>
                        </li>
                    ))
                }
            </ul>

            <h1 className="title"><code>Active Products</code></h1>
            <p>{activeProduct.title}</p>
        </div>
    );
};

export default ProductApp;
