const express = require("express");
const router = express.Router();

//Get all
router.get("/", (req, res, next) => {
    res.send("Hello world");
});
//Get one
router.get("/:id", (req, res, next) => {
    
});
//Create one
router.post("/", (req, res, next) => {});
//Update one
router.patch("/:id", (req, res, next) => {});
//Delete one
router.delete("/:id", (req, res, next) => {});

module.exports = router;
