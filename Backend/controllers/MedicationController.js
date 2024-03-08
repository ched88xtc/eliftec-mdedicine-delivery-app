import MedicationModel from "../models/Medication.js";

export const getByStoreId = async (req, res) => {
  try {
    const storeId = req.params.storeId;

    const storeMedications = await MedicationModel.find({
      storesId: { $in: [storeId] }
    });

    if (!storeMedications || storeMedications.length === 0) {
      return res.status(404).json({
        message: 'Store medications not found'
      });
    }

    res.json(storeMedications);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

export const updateIsFavorite = async (req, res) => {
  try {
    const medId = req.params.medId;

    await MedicationModel.updateOne(
      {
        _id: medId,
      },
      {
        $set: {
          isFavorite: req.body.isFavorite,
        }
      }
    )

    res.status(200).json({
      message: `Update successful, isFavorite: ${req.body.isFavorite}, id: ${medId}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};