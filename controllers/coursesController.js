const { ObjectId } = require("mongodb");

// CRUD logic
const getAllCourses = async (req, res, collection) => {
  try {
    const category = req.query.category;
    const instructor = req.query.instructor;
    const query = {};
    if (category) query.category = category;
    if (instructor) query.instructor = instructor;

    const courses = await collection.find(query).toArray();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCourseById = async (req, res, collection) => {
  try {
    const id = req.params.id;
    const course = await collection.findOne({ _id: new ObjectId(id) });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addCourse = async (req, res, collection) => {
  try {
    const newCourse = req.body;
    const result = await collection.insertOne(newCourse);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCourse = async (req, res, collection) => {
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

const deleteCourse = async (req, res, collection) => {
  try {
    const id = req.params.id;
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse
};
