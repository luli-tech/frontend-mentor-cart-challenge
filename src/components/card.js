import React, { useEffect } from "react";
import "./card.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../store";
import { addToCart, removeCart } from "../store";
import Cart from "./cart";
import OrderConfirmed from "./confirmCart";

const DessertCard = () => {
  const dispatch = useDispatch();

  const { cartItems, isLoading, error, cartContain, isVisible, scrollTo } =
    useSelector((state) => state.cart);
  useEffect(() => {
    console.log(cartItems);
  });

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  useEffect(() => {
    if (scrollTo) {
      window.scrollTo({ top: 350, behavior: "smooth" });
    }
  }, [scrollTo]);
  function getmyCart(dessert) {
    dispatch(addToCart(dessert));
  }
  function removeCar(dessert) {
    dispatch(removeCart(dessert));
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  function getBtn(dessert) {
    const isInCart = cartContain.find((item) => item.id === dessert.id);
    return (
      <>
        {isInCart && (
          <div className="quantity-control add-to-cart-button">
            <button
              className="quantity-btn decrement"
              onClick={() => removeCar(dessert)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="2"
                fill="none"
                viewBox="0 0 10 2"
              >
                <path fill="#fff" d="M0 .375h10v1.25H0V.375Z" />
              </svg>
            </button>
            <span className="quantity-display">
              {cartContain.find((item) => item.id === dessert.id)?.quantity ||
                1}
            </span>
            <button
              className="quantity-btn increment"
              onClick={() => getmyCart(dessert)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                fill="none"
                viewBox="0 0 10 10"
              >
                <path
                  fill="#fff"
                  d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
                />
              </svg>
            </button>
          </div>
        )}
        {!isInCart && (
          <button
            className="add-to-cart-button"
            onClick={() => getmyCart(dessert)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              fill="none"
              viewBox="0 0 21 20"
            >
              <g fill="#C73B0F" clipPath="url(#a)">
                <path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z" />
                <path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z" />
              </g>
              <defs>
                <clipPath id="a">
                  <path fill="#fff" d="M.333 0h20v20h-20z" />
                </clipPath>
              </defs>
            </svg>
            Add to Cart
          </button>
        )}
      </>
    );
  }

  if (error) {
    return <div>Something went wrong while fetching the data!</div>;
  }

  return (
    <>
      <div className="body">
        <h1 className="dessert-tit">Desserts</h1>
        <div className="card-container">
          {cartItems.map((dessert) => (
            <div key={dessert.id} style={{}} className="dessert-card">
              <div className="dessert-image">
                <img src={dessert.image.desktop} alt={dessert.name} />
              </div>
              <div className="dessert-info">
                <p className="dessert-category">{dessert.category}</p>
                <h2 className="dessert-title">{dessert.name}</h2>
                <p className="dessert-price">${dessert.price}</p>
                {getBtn(dessert)}
              </div>
            </div>
          ))}
          {isVisible && <OrderConfirmed />}
          {isVisible && <div className="over"></div>}
        </div>
      </div>
      <Cart />
    </>
  );
};

export default DessertCard;
