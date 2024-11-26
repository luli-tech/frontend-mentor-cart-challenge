import "./App.css";
import NavbarWithSidebar from "./components/navbar";
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Cart from "./components/cart";
import DessertCard from "./components/card";
import OrderConfirmed from "./components/confirmCart";
function App() {
  let router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<NavbarWithSidebar />}>
        <Route index element={<DessertCard />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/confirm" element={<OrderConfirmed />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
