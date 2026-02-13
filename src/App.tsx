import { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import FoodList from "./components/FoodList";
import Footer from "./components/Footer";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import Payment from "./components/Payment";

function App() {
  const foodListRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  const scrollToFoodList = () => {
    foodListRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    if (location.state?.scrollToFood) {
      scrollToFoodList();
    }
  }, [location]);

  return (
    <>
      <NavBar onFoodClick={scrollToFoodList} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home onOrderNow={scrollToFoodList} />
              <div ref={foodListRef}>
                <FoodList />
              </div>
              <Footer />
            </>
          }
        />

        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/payment" element={<Payment/>} />
      </Routes>
    </>
  );
}

export default App;
