import React, { useState, useEffect } from "react";
import { Tab, Tabs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { IShopsState, fetchShops } from "../../../redux/slices/shops";
import { fetchMedications } from "../../../redux/slices/medications";
import { AppDispatch } from "../../../redux/store";

export const ShopsList = () => {
  const dispatch: AppDispatch = useDispatch();

  // Selecting 'shops' state from Redux store
  const { shops } = useSelector((state: { shops: IShopsState }) => state.shops);

  // Effect hook to fetch shops data when the component mounts
  useEffect(() => {
    dispatch(fetchShops());
  },[dispatch]);

  // Effect hook to set the active shop and fetch medications when shops are loaded
  useEffect(() => {
    if (shops.items[0]) {
      // Set the first shop as the active shop
      const firstItem = shops.items[0];
      setActiveShop(firstItem.name);

      // Fetch medications for the first shop
      dispatch(fetchMedications(firstItem.id));
    }
  }, [shops.items, dispatch]);

  // State to track the currently active shop
  const [activeShop, setActiveShop] = useState<string>("Drugs 24");

  // Event handler for tab change
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    // Set the active shop when the tab changes
    setActiveShop(newValue);
  };

  return (
    <div
      style={{
        padding: "16px 0",
        minWidth: 200,
        borderRight: "1px solid #e5e5e5",
        height: "calc(100vh - 82px)",
      }}
    >
      <Tabs
        value={activeShop}
        onChange={handleChange}
        aria-label="nav tabs"
        orientation="vertical"
        variant="scrollable"
      >
        {shops.status === "loaded" &&
          shops.items.map((el) => (
            <Tab
              key={el.id}
              label={el.name}
              value={el.name}
              onClick={() => dispatch(fetchMedications(el.id))}
            />
          ))}
      </Tabs>
    </div>
  );
};
