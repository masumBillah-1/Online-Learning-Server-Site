const express = require("express");
const { addPurchase, getAllPurchases } = require("../controllers/purchaseController");

const router = express.Router();

module.exports = (purchaseCollection) => {
  router.post("/", (req, res) => addPurchase(req, res, purchaseCollection));
  router.get("/", (req, res) => getAllPurchases(req, res, purchaseCollection));

  return router;
};
