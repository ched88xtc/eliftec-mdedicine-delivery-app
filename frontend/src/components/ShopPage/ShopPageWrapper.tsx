import { ShopsList } from "./ShopsList/ShopsList";
import { MedicationsList } from "./MedicationsList/MedicationsList";

export const ShopPageWrapper = () => {
  return(
    <div
      style={{
        paddingTop: 50,
        display: 'flex',
        height: "calc(100vh - 50px)",
        overflow: "hidden"
      }}
    >
      <ShopsList/>
      <MedicationsList/>
    </div>
  )
}