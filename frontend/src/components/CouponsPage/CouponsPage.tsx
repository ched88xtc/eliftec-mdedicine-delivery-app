import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ICouponsState, fetchCoupons } from "../../redux/slices/couponsSlice";
import { CouponsCard } from "./CouponCard";
import { Typography } from "@mui/material";
import { AppDispatch } from "../../redux/store";

export const CouponsPage = () => {
   // Get the dispatch function from the Redux store
   const dispatch: AppDispatch = useDispatch();

   // Get the 'coupons' state from the Redux store
   const { coupons } = useSelector((state: { coupons: ICouponsState }) => state.coupons);
 
   // useEffect hook to dispatch the 'fetchCoupons' action when the component mounts
   useEffect(() => {
     dispatch(fetchCoupons());
   }, [dispatch]);

  return (
    <div
      style={{
        padding: "80px 40px",
      }}
    >
      <div
        style={{
          height: "fit-content",
          border: "1px solid #e5e5e5",
          borderRadius: 20,
          display: "flex",
          gap: 40,
          padding: 40
        }}
      >
        {
          coupons.status === "loading"
          &&
          <div
            style={{
              width: "100%",
              height: "15vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" color="black">
              Loading...
            </Typography>
          </div>
        }
        {coupons.status === "loaded" && coupons.items.map((el) => (
          <CouponsCard key={el._id} code={el.code} discount={el.discount} />
        ))}
      </div>
    </div>
  );
};
