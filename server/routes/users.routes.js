const userController = require("../controllers/users.controller");

module.exports = (app) => {
    app.post("/api/users", userController.create);
    app.get("/api/users", userController.getAll);
    app.get("/api/users/:id", userController.getOne);
    app.delete("/api/users/:id", userController.delete);
    app.put("/api/users/:id/edit", userController.update);
    app.put("/api/users/:id", userController.update);
};