const express = require("express")
const { getPieChart, getCombinedData, getTransactions, getBarGraph, getStatistics } = require("../controllers/product.controllers")
const router= express.Router()


router.get("/get-pie-chart" , getPieChart)
router.get("/get-bar-graph" , getBarGraph)
router.get("/get-statistic" , getStatistics)
router.get("/get-transactions" , getTransactions)
router.get("/get-combined-data" , getCombinedData)

module.exports = router