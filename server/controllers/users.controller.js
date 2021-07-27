const User = require("../models/user.model");

module.exports = {
    create: function (req, res) {
        console.log("create method executed");

        User.create(req.body)
            .then((user) => {
                res.json(user);
                console.log(res.json(user))
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    },

    register: (req, res) => {
        User.create(req.body)
            .then(user => {
                res.json({ msg: "success!", user: user });
            })
            .catch(err => res.json(err));
    },

    getAll(req, res) {
        console.log("getAll method executed");

        User.find()
            .then((users) => {
                res.json(users);
            })
            .catch((err) => {
                res.json(err);
            });
        },

    getOne(req, res) {
        console.log("getOne method executed", "url params", req.params);

        User.findById(req.params.id)
            .then((user) => {
                res.json(user);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    },

    delete(req, res) {
        console.log("delete method executed", "url params", req.params);

        User.findByIdAndDelete(req.params.id)
            .then((user) => {
                res.json(user);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    },

    update(req, res) {
        console.log("update method executed", "url params:", req.params);

        User.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true,
            new: true,
        })
            .then((updatedUser) => {
                res.json(updatedUser);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
        },
};