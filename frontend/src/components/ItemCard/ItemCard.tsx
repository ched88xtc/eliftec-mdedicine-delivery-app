import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import {
  ICartState,
  addProduct,
  removeAllProduct,
  removeProduct,
} from "../../redux/slices/cart";
import {
  Add,
  Delete,
  Done,
  Favorite,
  FavoriteBorder,
  Remove,
} from "@mui/icons-material";
import { toggleFavoriteMed } from "../../redux/slices/medications";
import { AppDispatch } from "../../redux/store";

interface ItemCardProps {
  id: string;
  name: string;
  imgUrl: string;
  price: number;
  isFavorite: boolean;
  count?: number;
  variant?: "default" | "cart" | "history";
}

export const ItemCard = ({
  id,
  name,
  imgUrl,
  price,
  isFavorite,
  count = 1,
  variant = "default",
}: ItemCardProps) => {
  // Initializing dispatch function from Redux
  const dispatch: AppDispatch = useDispatch();

  // Selecting the 'cart' state from the Redux store
  const { cart } = useSelector((state: { cart: ICartState }) => state.cart);

  // Finding the current item in the cart based on its ID
  const foundItem = cart.items.find((el) => el.id === id);

  // Creating the item object
  const item = {
    id,
    name,
    imgUrl,
    price,
    count,
    isFavorite,
  };

  // Handling the click event to add the item to the cart
  const handleAddToCartClick = () => {
    dispatch(addProduct(item));
  };

  // Handling the click event to remove the item from the cart
  const handleRemoveFromCartClick = () => {
    dispatch(removeProduct(item));
  };

  // Handling the click event to remove all instances of the item from the cart
  const handleDeleteAllClick = () => {
    dispatch(removeAllProduct(item));
  };

  // Handling the click event to toggle the favorite status of the item
  const handleToggleFavorite = (medId: string) => {
    dispatch(toggleFavoriteMed({ medId, isFavorite: !isFavorite }));
  };

  return (
    <Card sx={{ width: 240, height: "fit-content", position: "relative" }}>
      {variant === "default" && (
        <CardActions
          style={{
            position: "absolute",
            right: 0,
            padding: 4,
          }}
        >
          <IconButton onClick={() => handleToggleFavorite(id)}>
            {isFavorite ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </CardActions>
      )}
      <CardMedia
        style={{
          paddingTop: 40,
        }}
        component="img"
        height="150"
        image={imgUrl}
        alt="medication"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="h6" color="black">
          ${price}
        </Typography>
      </CardContent>
      {variant === "default" && !foundItem && (
        <CardActions style={{ height: 40 }}>
          <Button
            size="small"
            color="primary"
            onClick={() => handleAddToCartClick()}
          >
            Add to cart
          </Button>
        </CardActions>
      )}
      {variant === "default" && foundItem && (
        <CardActions>
          <Done color="success" style={{ height: 30, width: 30, padding: 5 }} />
        </CardActions>
      )}
      {variant === "cart" && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <CardActions>
            <IconButton
              color="primary"
              onClick={() => handleRemoveFromCartClick()}
            >
              <Remove />
            </IconButton>
            <Typography variant="h6" color="black">
              {count}
            </Typography>
            <IconButton color="primary" onClick={() => handleAddToCartClick()}>
              <Add />
            </IconButton>
          </CardActions>
          <CardActions>
            <IconButton color="primary" onClick={() => handleDeleteAllClick()}>
              <Delete color="error" />
            </IconButton>
          </CardActions>
        </div>
      )}
      {variant === "history" && (
        <Typography variant="body1" color="black" sx={{ padding: 1 }}>
          Count: {count}
        </Typography>
      )}
    </Card>
  );
};
