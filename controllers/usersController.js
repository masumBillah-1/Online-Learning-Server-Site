const { ObjectId } = require("mongodb");

// ✅ সব user দেখার জন্য
const getAllUsers = async (req, res, collection) => {
  try {
    const users = await collection.find().toArray();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ একক user দেখার জন্য
const getUserById = async (req, res, collection) => {
  try {
    const id = req.params.id;
    const user = await collection.findOne({ _id: new ObjectId(id) });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ নতুন user add করার জন্য
const addUser = async (req, res, collection) => {
  try {
    const newUser = req.body;

const result = await collection.insertOne(newUser);

        res.json(result);

    const email = req.body.email
    const query = {email: email}
    const existingUser = await collection.findOne(query)

    if(existingUser){
        res.send('user already exait')
    }else{
        const result = await collection.insertOne(newUser);

        res.json(result);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ user update করার জন্য
const updateUser = async (req, res, collection) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ user delete করার জন্য
const deleteUser = async (req, res, collection) => {
  try {
    const id = req.params.id;
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser
};
