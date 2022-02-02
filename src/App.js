import CounterApp from "./components/CounterApp";
import ProductApp from "./components/ProductApp";
import ToDo from "./components/ToDo";
import './counterApp.css';

function App() {
  return (
    <div>
      <CounterApp />
      <ToDo />
      <ProductApp />
    </div>
  );
}

export default App;
