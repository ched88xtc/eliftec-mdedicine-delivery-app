import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useParams } from "react-router";
import { Link, Typography } from "@mui/material";

interface CompletedOrderProps {

}

interface RouteParams {
  orderId: string;
  [key: string]: string | undefined;
}

export const CompletedOrder: React.FC<CompletedOrderProps> = () => {
  const params = useParams<RouteParams>();

  return (
    <div
      style={{
        paddingTop: 100,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "fit-content",
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
        <Typography variant="h4" color="black">
          Your order is completed and will be delivered soon!
        </Typography>
        <div
          style={{ display: "flex", gap: 10, justifyContent: "center" }}
        >
          <Typography variant="h6" color="black">
            ID:
          </Typography>
          <Typography variant="h6" color="black" fontWeight={600}>
            {params.orderId}
          </Typography>
        </div>
        <Link variant="h6" component={RouterLink} to="/">
          Go to shop
        </Link>
      </div>
    </div>
  );
};