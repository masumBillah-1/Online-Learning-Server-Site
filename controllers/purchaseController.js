
const addPurchase = async (req, res, collection) => {
  try {
    const newPurchase = req.body;
    const result = await collection.insertOne(newPurchase);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllPurchases = async (req, res, collection) => {
  try {
    const purchases = await collection.find().toArray();
    res.json(purchases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addPurchase, getAllPurchases };
