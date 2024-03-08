import { useSelector } from "react-redux";
import { ItemCard } from "../ItemCard/ItemCard";
import { ShoppingCartForm } from "./ShoppingCartForm";
import { ICartState } from "../../redux/slices/cart";
import { ShoppingCartFormWithMapWrapper } from "./ShoppingCartFormWithMapWrapper";

export const ShoppingCart = () => {
  const { cart } = useSelector((state: { cart: ICartState }) => state.cart);

  return (
    <div
      style={{
        padding: "100px 50px",
        display: "flex",
        gap: 40,
      }}
    >
      <div
        style={{
          padding: 40,
          border: "1px solid #e5e5e5",
          borderRadius: 20,
          width: "70%",
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        {cart.items.map((el) => (
          <ItemCard
            key={el.id}
            id={el.id}
            imgUrl={el.imgUrl}
            isFavorite={el.isFavorite}
            name={el.name}
            price={el.price}
            count={el.count}
            variant="cart"
          />
        ))}
      </div>
      <ShoppingCartFormWithMapWrapper/>
    </div>
  );
};
