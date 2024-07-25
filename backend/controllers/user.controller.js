const User = require("../models/User");

exports.read = async (req, res) => {
  try {
    const allusers = await User.find({});
    res.status(200).send(allusers);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).send({ message: "User Deleted" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.readById = async (req, res) => {
  try {
    const { id } = req.params;
    const singleUser = await User.findById(id);
    res.status(200).send(singleUser);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
