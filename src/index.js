/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const express = require('express');
const {Compiler} = require("@incodelang/compiler");
const cors = require('cors');
const bodyParser = require('body-parser')
const url = require("url");

const app = express();

app.use(cors())
app.use(bodyParser.json())

app.post("/compiled", (req, res) => {
    const body = req.body;
    if (body.code) {
        res.status(200);
        res.end(Compiler.compile(body.code));
    } else {
        res.status(400)
        res.end(JSON.stringify({
            error: true,
            message: "Invalid Request Body"
        }))
    }
})

app.post("/compiled/ast", (req, res) => {
    const body = req.body;
    if (body.ast) {
        res.status(200);
        res.end(Compiler.compileAST(body.ast));
    } else {
        res.status(400)
        res.end(JSON.stringify({
            error: true,
            message: "Invalid Request Body"
        }))
    }
})

app.post("/generated/ast", (req, res) => {
    const body = req.body;
    if (body.code) {
        res.status(200);
        res.end(JSON.stringify(Compiler.generateAST(body.code)));
    } else {
        res.status(400)
        res.end(JSON.stringify({
            error: true,
            message: "Invalid Request Body"
        }))
    }
})

app.get("/view", (req, res) => {
    if(req.query.code) {
        res.status(200);
        res.end("<body></body><script>" + Compiler.compile(decodeURIComponent(req.query.code)) + "</script>");
    } else {
        res.status(400)
        res.end(JSON.stringify({
            error: true,
            message: "Invalid Request Body"
        }))
    }
})

app.get("*", (req, res) => {
    res.status(400)
    res.end(JSON.stringify({
        error: true,
        message: "Invalid API Entpoint"
    }))
})

app.listen(3000, "0.0.0.0");