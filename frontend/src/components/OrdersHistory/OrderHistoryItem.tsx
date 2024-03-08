import { ItemCard } from "../ItemCard/ItemCard";
import { Typography } from "@mui/material";

interface OrdersHistoryItemProps {
  totalPrice: number;
  orderDate: string;
  medicatesList: [
    {
      id: string;
      imgUrl: string;
      isFavorite: boolean;
      name: string;
      price: number;
      count: number;
    }
  ];
}

export const OrdersHistoryItem = ({
  totalPrice,
  orderDate,
  medicatesList,
}: OrdersHistoryItemProps) => {
  const formattedDate = new Date(orderDate).toLocaleString();

  return (
    <div
      style={{
        height: "fit-content",
        border: "1px solid #e5e5e5",
        borderRadius: 20,
        padding: 40,
        display: "flex",
        flexDirection: "column",
        gap: 20
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        {medicatesList.map((el) => (
          <ItemCard
            key={el.id}
            id={el.id}
            imgUrl={el.imgUrl}
            isFavorite={el.isFavorite}
            name={el.name}
            price={el.price}
            count={el.count}
            variant="history"
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Typography variant="h6" color="black" sx={{ textWrap: "nowrap" }}>
          Total price:
        </Typography>
        <Typography variant="h6" color="black">
          ${totalPrice}
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Typography variant="h6" color="black" sx={{ textWrap: "nowrap" }}>
          Order date:
        </Typography>
        <Typography variant="h6" color="black">
          {formattedDate}
        </Typography>
      </div>
    </div>
  );
};
