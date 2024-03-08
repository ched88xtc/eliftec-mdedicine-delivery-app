import React, { useEffect, useState } from "react";
import { Tabs, AppBar, Tab } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export const PageHeader = () => {
  const location = useLocation();

  const [activeTab, setActiveTab] = useState<string>("/");
  
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };


  useEffect(() => {
    setActiveTab(location.pathname);
  },[location.pathname]);

  return(
    <AppBar style={{paddingLeft: 40}} color="default">
      <Tabs
        value={activeTab}
        onChange={handleChange}
        aria-label="nav tabs"
      >
       <Tab
          label={"Shop"}
          value={"/"}
          component={Link}
          to={"/"}
        />
        <Tab
          label={"Shopping cart"}
          value={"/cart"}
          component={Link}
          to={"/cart"}
        />
        <Tab
          label={"History"}
          value={"/history"}
          component={Link}
          to={"/history"}
        />
        <Tab
          label={"Coupons"}
          value={"/coupons"}
          component={Link}
          to={"/coupons"}
        />
      </Tabs>
    </AppBar>
  )
}