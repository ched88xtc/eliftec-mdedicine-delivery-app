import React, { useState } from "react";
import { Button, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { OrdersHistoryItem } from "./OrderHistoryItem";
import { useDispatch, useSelector } from "react-redux";
import { IOrdersState, getOrdersBy } from "../../redux/slices/orders";
import { AppDispatch } from "../../redux/store";

export const OrdersHistory = () => {
  const dispatch: AppDispatch = useDispatch();

  // Select orders from Redux store
  const { orders } = useSelector(
    (state: { orders: IOrdersState }) => state.orders
  );

  // State to manage active tab (phone, email, id)
  const [activeTab, setActiveTab] = useState<string>("phone");

  // Function to handle tab change
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  // Function to handle form submission
  const onSubmit = async (formData: any) => {
    dispatch(getOrdersBy({ value: formData, getBy: activeTab }));
  };

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      phone: "",
      id: "",
    },
    mode: "onChange",
  });

  return (
    <div
      style={{
        paddingTop: 70,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "80%",
          height: "fit-content",
          border: "1px solid #e5e5e5",
          borderRadius: 20,
          padding: 40,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Tabs value={activeTab} onChange={handleChange}>
          <Tab label={"Phone"} value={"phone"} />
          <Tab label={"E-mail"} value={"email"} />
          <Tab label={"Id"} value={"id"} />
        </Tabs>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              height: "fit-content",
              display: "flex",
              flexDirection: "column",
              gap: 30,
            }}
          >
            {activeTab === "phone" && (
              <TextField
                style={{
                  position: "relative",
                }}
                FormHelperTextProps={{
                  sx: { position: "absolute", bottom: -24 },
                }}
                label="Phone"
                fullWidth
                error={Boolean(errors.phone?.message)}
                helperText={errors.phone?.message}
                {...register("phone", { required: "Phone is required" })}
              />
            )}
            {activeTab === "email" && (
              <TextField
                style={{
                  position: "relative",
                }}
                FormHelperTextProps={{
                  sx: { position: "absolute", bottom: -24 },
                }}
                label="Email"
                fullWidth
                error={Boolean(errors.email?.message)}
                helperText={errors.email?.message}
                {...register("email", { required: "Email is required" })}
              />
            )}
            {activeTab === "id" && (
              <TextField
                style={{
                  position: "relative",
                }}
                FormHelperTextProps={{
                  sx: { position: "absolute", bottom: -24 },
                }}
                label="Id"
                fullWidth
                error={Boolean(errors.id?.message)}
                helperText={errors.id?.message}
                {...register("id", { required: "Id is required" })}
              />
            )}

            <Button type="submit" variant="contained" size="large">
              Find
            </Button>
          </form>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          padding: 40,
          gap: 20,
        }}
      >
        {orders.status === "loading" && (
          <div
            style={{
              width: "100%",
              height: "50vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" color="black">
              Loading...
            </Typography>
          </div>
        )}
        {orders.status === "loaded" &&
          orders.items.map((el: any) => (
            <OrdersHistoryItem
              medicatesList={el.medicationsList}
              totalPrice={el.totalPrice}
              orderDate={el.createdAt}
            />
          ))}
      </div>
    </div>
  );
};
