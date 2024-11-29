import express from "express";

const transactionsRouter = express.Router()
transactionsRouter.get("/", (req, res) => {
    res.send()
})
transactionsRouter.post("/", (req, res) => {
    res.send()
})
transactionsRouter.delete("/:transactionId", (req, res) => {
    res.send()
})

export default transactionsRouter