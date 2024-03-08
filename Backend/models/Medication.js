import mongoose from "mongoose";

const MedicationSchema = new mongoose.Schema(
  {
    storesId: {
      type: [String],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isFavorite: {
      type: Boolean,
      required: true
    },
    imgUrl: String,
  },
)

export default mongoose.model('Medication', MedicationSchema)