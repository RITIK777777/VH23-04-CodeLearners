const scholarship = require("../models/scholarship");
// const Scholarship = require("../models/scholarship");

exports.createScholarship = async (req, res) => {
  try {
    const { title, description, eligibilityCriteria } = req.body;

    if (!title || !description || !eligibilityCriteria || !category) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const scholarship = new Scholarship({
      title,
      description,
      eligibilityCriteria,
    });

    const savedScholarship = await scholarship.save();
    res.status(201).json({ success: true, scholarship: savedScholarship });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error in creating scholarship",
      error: error.message,
    });
  }
};

exports.getAllScholarships = async (req, res) => {
  try {
    const scholarships = await Scholarship.find();
    res.status(200).json({ success: true, scholarships });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error in fetching scholarships",
      error: error.message,
    });
  }
};

exports.getScholarshipById = async (req, res) => {
  const { scholarshipId } = req.params;

  try {
    const scholarship = await Scholarship.findById(scholarshipId);

    if (!scholarship) {
      return res
        .status(404)
        .json({ success: false, message: "Scholarship not found" });
    }

    res.status(200).json({ success: true, scholarship });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error in fetching scholarship",
      error: error.message,
    });
  }
};

exports.updateScholarshipById = async (req, res) => {
  const { scholarshipId } = req.params;
  const { title, description, eligibilityCriteria } = req.body;

  try {
    const scholarship = await Scholarship.findById(scholarshipId);

    if (!scholarship) {
      return res
        .status(404)
        .json({ success: false, message: "Scholarship not found" });
    }

    scholarship.title = title;
    scholarship.description = description;
    scholarship.eligibilityCriteria = eligibilityCriteria;

    const updatedScholarship = await scholarship.save();
    res.status(200).json({ success: true, scholarship: updatedScholarship });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error in updating scholarship",
      error: error.message,
    });
  }
};

exports.deleteScholarshipById = async (req, res) => {
  const { scholarshipId } = req.params;

  try {
    const scholarship = await Scholarship.findById(scholarshipId);

    if (!scholarship) {
      return res
        .status(404)
        .json({ success: false, message: "Scholarship not found" });
    }

    await scholarship.remove();
    res
      .status(200)
      .json({ success: true, message: "Scholarship deleted successfully" });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error in deleting scholarship",
      error: error.message,
    });
  }
};

exports.getPersonalizedRecommendations = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const userInterests = user.interests;

    const recommendedScholarships = await Scholarship.find({
      category: { $in: userInterests },
    })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({ success: true, recommendedScholarships });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error in getting personalized recommendations",
      error: error.message,
    });
  }
};

exports.getScholarshipsForMap = async (req, res) => {
  try {
    const scholarships = await Scholarship.find({}, { title: 1, location: 1 });

    res.status(200).json({ success: true, scholarships });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error in getting scholarships for map",
      error: error.message,
    });
  }
};

exports.searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await scholarship.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    });
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};
