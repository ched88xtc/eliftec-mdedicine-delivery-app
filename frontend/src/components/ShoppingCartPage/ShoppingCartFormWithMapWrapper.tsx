import React, { useState } from "react";
import { ShoppingCartForm } from "./ShoppingCartForm";
import { GoogleMapComponent } from "../GoogleMapComponent/GoogleMapComponent";
import { Typography } from "@mui/material";

const shopLocation = { lat: 49.233669, lng: 28.459077 };

export const ShoppingCartFormWithMapWrapper = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleAddressChange = (address: string) => {
    setInputValue(address);
  };

  return (
    <div
      style={{
        width: "40%",
        border: "1px solid #e5e5e5",
        borderRadius: 20,
        padding: 40,
      }}
    >
      <Typography variant="h5" color="black">
        Delivery information:
      </Typography>
      <GoogleMapComponent
        shopLocation={shopLocation}
        onAddressChange={handleAddressChange}
      />
      <ShoppingCartForm address={inputValue} />
    </div>
  );
};