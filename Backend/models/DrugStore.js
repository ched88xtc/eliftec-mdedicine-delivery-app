import mongoose from "mongoose";

const DrugStoreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
)

export default mongoose.model('DrugStore', DrugStoreSchema)