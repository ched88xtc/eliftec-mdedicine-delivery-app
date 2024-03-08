import StoreModel from "../models/DrugStore.js"

export const getAll = async (req, res) => {
  try {
    const stores = await StoreModel.find();

    const mappedData = stores.map(el => ({
      id: el._id,
      name: el.name,
    }));

    res.json(mappedData);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Can`t get stores!'
    })
  }
}

export const getById = async (req, res) => {
  try {
    const storeId = req.params.id;

    const store = await StoreModel.findOne({
      _id: storeId
    });

    if (!store) {
      return res.status(404).json({
        message: 'Store not found'
      });
    }

    res.json(store);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Store not found'
    })
  }
}