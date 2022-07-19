"use strict";
exports.__esModule = true;
var express_1 = require("express");
function routes(client) {
    var router = (0, express_1.Router)();
    var baseRoute = "/companies";
    router.post(baseRoute, function (req, res) {
        var _a = req.body, name = _a.name, description = _a.description, employees = _a.employees;
        if (!name || !description || !employees) {
            res.status(400).send("Missing required fields");
            return;
        }
        client.companies
            .create({
            data: {
                name: name,
                description: description,
                employees: employees
            }
        })
            .then(function (company) {
            res.json(company);
        })["catch"](function (err) {
            res.status(500).json({ error: err.message });
        });
    });
    router.put("".concat(baseRoute, "/:id"), function (req, res) {
        var id = req.params.id;
        var _a = req.body, name = _a.name, description = _a.description, employees = _a.employees;
        if (!name || !description || !employees) {
            res.status(400).send("Missing required fields");
            return;
        }
        client.companies
            .update({
            where: { id: id },
            data: {
                name: name,
                description: description,
                employees: employees
            }
        })
            .then(function (company) {
            res.json(company);
        })["catch"](function (err) {
            res.status(500).json({ error: err.message });
        });
    });
    router.get("".concat(baseRoute, "/:id"), function (req, res) {
        var id = req.params.id;
        client.companies
            .findUnique({
            where: { id: id }
        })
            .then(function (company) {
            res.json(company);
        })["catch"](function (err) {
            res.status(500).json({ error: err.message });
        });
    });
    router.get(baseRoute, function (req, res) {
        client.companies
            .findMany()
            .then(function (companies) {
            res.json(companies);
        })["catch"](function (err) {
            res.status(500).json({ error: err.message });
        });
    });
    router["delete"]("".concat(baseRoute, "/:id"), function (req, res) {
        var id = req.params.id;
        client.companies["delete"]({
            where: { id: id }
        })
            .then(function (company) {
            res.json(company);
        })["catch"](function (err) {
            res.status(500).json({ error: err.message });
        });
    });
    return router;
}
exports["default"] = routes;
//# sourceMappingURL=routes.js.map