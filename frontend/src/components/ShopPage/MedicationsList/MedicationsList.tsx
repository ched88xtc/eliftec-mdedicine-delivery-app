import { ItemCard } from "../../ItemCard/ItemCard";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup, Typography } from "@mui/material";
import {
  IMedicationsState,
  sortByPrice,
} from "../../../redux/slices/medications";
import { AppDispatch } from "../../../redux/store";

export const MedicationsList = () => {
  const dispatch: AppDispatch = useDispatch();

  const { medications } = useSelector(
    (state: { medications: IMedicationsState }) => state.medications
  );

  return (
    <div
      style={{
        width: "100%",
        padding: "40px 40px",
        overflow: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          paddingBottom: 20,
          gap: 10,
        }}
      >
        <Typography variant="body1">Sort by price:</Typography>
        <div>
          <ButtonGroup>
            <Button
              size="small"
              onClick={() => dispatch(sortByPrice("lowToHigh"))}
            >
              Low to high
            </Button>
            <Button
              size="small"
              onClick={() => dispatch(sortByPrice("highToLow"))}
            >
              High to low
            </Button>
            <Button size="small" onClick={() => dispatch(sortByPrice("reset"))}>
              Reset
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        {medications.status === "error" && (
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
              Oops. Something went wrong.
            </Typography>
          </div>
        )}
        {medications.status === "loading" && (
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
        {medications.status === "loaded" &&
          medications.items.map((el: any) => (
            <ItemCard
              key={el._id}
              id={el._id}
              isFavorite={el.isFavorite}
              imgUrl={el.imgUrl}
              name={el.name}
              price={el.price}
            />
          ))}
      </div>
    </div>
  );
};
