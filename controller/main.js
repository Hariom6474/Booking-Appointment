const User = require("../model/user");

exports.postAddIndex = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const data = await User.create({
      name: name,
      email: email,
      phone: phone,
    });
    res.status(201).json(data);
    console.log(data);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

exports.getIndex = async (req, res, next) => {
  try {
    const user = await User.findAll();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.postDeleteIndex = async (req, res, next) => {
  try {
    const userId = req.params.id;
    await User.destroy({ where: { id: userId } });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
};
