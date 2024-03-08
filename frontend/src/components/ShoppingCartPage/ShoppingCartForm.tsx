import axios from "../../axios";
import { TextField, Typography, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";
import { ICartState, applyDiscount, clearCart } from "../../redux/slices/cart";
import { useState } from "react";
import { AppDispatch } from "../../redux/store";
import { GoogleMapComponent } from "../GoogleMapComponent/GoogleMapComponent";

interface IShoppingCartFormProps {
  address: string;
}

export const ShoppingCartForm = ({
  address
}: IShoppingCartFormProps) => {
  // Extracting cart state from Redux store using useSelector
  const { cart } = useSelector((state: { cart: ICartState }) => state.cart);

  // Initializing Redux dispatch and navigation hooks
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  // Regular expressions for input validation
  const phoneRegExp = /^\+380\d{9}$/;
  const nameRegExp = /^[a-zA-Z]+$/;

  // Setting up validation schema using Yup
  const schema = object({
    name: string()
      .required("Name is required")
      .min(3, "Name should contain 3 or more symbols")
      .matches(nameRegExp, "Name must contain only letters"),
    phone: string()
      .required("Phone number is required")
      .matches(phoneRegExp, "Phone number is not valid"),
    email: string()
      .required("Email is required")
      .email("Must be a valid email address"),
    coupon: string(),
  });

  // Initializing react-hook-form with validation schema and default values
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      coupon: "",
    },
    mode: "onChange",
  });

  // State variables for coupon code and error handling
  const [couponCode, setCouponCode] = useState<string>();
  const [couponDiscount, setCouponDiscount] = useState<number>();
  const [couponErr, setCouponErr] = useState<string>("");
  const [isCouponButtonDisabled, setIsCouponButtonDisabled] =
    useState<boolean>(false);

  // Form submission handler
  const onSubmit = async (formData: any) => {

    if (address.length <= 0) {
      alert("Add address")
      return;
    }

    // Creating an object with form data and cart details
    const fields = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: address,
      medicationsList: cart.items,
      totalPrice: cart.totalPrice,
    };
    console.log(fields);

    // Displaying an alert if the cart is empty
    if (cart.items.length === 0) {
      alert("Add some product.");
      return;
    }

    // Making a POST request to the server to create an order
    const { data } = await axios.post("/orders", fields);

    // Navigating to the completed order page and clearing the cart
    navigate(`/completed-order/${data.orderId}`);
    dispatch(clearCart());
  };

  // Handler for applying a coupon code
  const onApplyCoupon = async () => {
    // Making a GET request to validate the coupon code
    const { data } = await axios.get(`/coupons/${couponCode}`);

    // Handling coupon validation results
    if (data.length === 0) {
      setCouponErr("This coupon doesn't exist");
      return;
    }

    setCouponDiscount(data[0].discount);

    // Dispatching a Redux action to apply the discount
    dispatch(applyDiscount(data[0].discount));
    setIsCouponButtonDisabled(true);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        height: "fit-content",
        display: "flex",
        flexDirection: "column",
        gap: 30,
      }}
    >
      <TextField
        style={{
          position: "relative",
        }}
        FormHelperTextProps={{ sx: { position: "absolute", bottom: -24 } }}
        label="Name"
        fullWidth
        error={Boolean(errors.name?.message)}
        helperText={errors.name?.message}
        {...register("name")}
      />
      <TextField
        style={{
          position: "relative",
        }}
        FormHelperTextProps={{ sx: { position: "absolute", bottom: -24 } }}
        label="Email"
        fullWidth
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        {...register("email")}
      />
      <TextField
        style={{
          position: "relative",
        }}
        FormHelperTextProps={{ sx: { position: "absolute", bottom: -24 } }}
        label="Phone"
        fullWidth
        error={Boolean(errors.phone?.message)}
        helperText={errors.phone?.message}
        {...register("phone")}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <TextField
          style={{
            position: "relative",
          }}
          FormHelperTextProps={{ sx: { position: "absolute", bottom: -24 } }}
          label="Coupon code"
          fullWidth
          error={couponErr.length > 0}
          helperText={couponErr.length > 0 && couponErr}
          value={couponCode}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setCouponCode(event.target.value);
            setCouponErr("");
          }}
        />
        <Button
          variant="contained"
          disabled={isCouponButtonDisabled}
          onClick={onApplyCoupon}
        >
          Apply coupon
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Typography variant="h5" color="black">
          Total:
        </Typography>
        <Typography variant="h6" color="black" fontWeight={600}>
          ${cart.totalPrice.toFixed(2)}
        </Typography>
        {isCouponButtonDisabled && (
          <div style={{ display: "flex" }}>
            <Typography variant="body1" color="black" fontWeight={600}>
              {`($${cart.priceBeforeDiscount.toFixed(2)} - `}
              <span
                style={{ color: "red", fontWeight: 400 }}
              >{`${couponDiscount}%`}</span>
              {`)`}
            </Typography>
          </div>
        )}
      </div>
      <Button type="submit" color="success" variant="contained" size="large">
        Submit order
      </Button>
    </form>
  );
};
