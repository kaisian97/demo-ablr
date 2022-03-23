import BaseLayout from "layouts/BaseLayout";
import Cart from "pages/Cart";
import Checkout from "pages/Checkout";
import Home from "pages/Home";
import Product from "pages/Product";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <BaseLayout>
      <Routes>
        <Route path={Home.path} element={<Home />} />
        <Route path={`${Product.path}/:id`} element={<Product />} />
        <Route path={Cart.path} element={<Cart />} />
        <Route path={Checkout.path} element={<Checkout />} />
      </Routes>
    </BaseLayout>
  );
}

export default App;
