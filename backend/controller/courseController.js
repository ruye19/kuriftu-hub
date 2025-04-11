const dbcon = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");
const createCourse = async (req, res) => {
  const { title, description, category, image, videoUrl, startDate, endDate } =
    req.body;

  if (!title) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Title is required" });
  }

  try {
    await dbcon.query(
      `INSERT INTO courses (title, description, category, image, videoUrl, startDate, endDate)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, description, category, image, videoUrl, startDate, endDate]
    );

    res
      .status(StatusCodes.CREATED)
      .json({ msg: "Course created successfully" });
  } catch (error) {
    console.error("createCourse error:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong" });
  }
};

// Get all courses
const getAllCourses = async (req, res) => {
  try {
    const [courses] = await dbcon.query("SELECT * FROM courses");
    res.status(StatusCodes.OK).json(courses);
  } catch (error) {
    console.error("getAllCourses error:", error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Server error" });
  }
};

// Get a single course by ID
const getCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await dbcon.query(
      "SELECT * FROM courses WHERE cource_id = ?",
      [id]
    );
    if (rows.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Course not found" });
    }
    res.status(StatusCodes.OK).json(rows[0]);
  } catch (error) {
    console.error("getCourse error:", error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Server error" });
  }
};

// Update a course
const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, description, category, image, videoUrl, startDate, endDate } =
    req.body;

  try {
    const [result] = await dbcon.query(
      `UPDATE courses SET
         title = ?, description = ?, category = ?, image = ?, videoUrl = ?, startDate = ?, endDate = ?
       WHERE cource_id = ?`,
      [title, description, category, image, videoUrl, startDate, endDate, id]
    );

    if (result.affectedRows === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Course not found" });
    }

    res.status(StatusCodes.OK).json({ msg: "Course updated successfully" });
  } catch (error) {
    console.error("updateCourse error:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Failed to update course" });
  }
};

// Delete a course
const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await dbcon.query(
      "DELETE FROM courses WHERE cource_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Course not found" });
    }

    res.status(StatusCodes.OK).json({ msg: "Course deleted successfully" });
  } catch (error) {
    console.error("deleteCourse error:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Failed to delete course" });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  deleteCourse,
};
