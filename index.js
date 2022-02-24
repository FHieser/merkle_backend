const express = require('express');
const { send } = require('express/lib/response');
const Web3 = require('web3');
const merkletreejs = require('./merkle_tree.js');


const app = express()
const port = 3000

app.get('/', (req, res) => {

    try {
        let address = req.body.address;

        if (!Web3.utils.isAddress(address)) {
            res.status(406).send({ message: "Not a recognizable Address" })
        }

        let { isValid, hexProof } = merkletreejs.getProof(address)

        if (!isValid) {
            res.status(406).send({ message: "Not a whitelisted Address" })
        }
        res.status(200).json({ proof: hexProof }).send()
    }
    catch (e) {
        res.status(400).send({ message: "Could not process." })
    }

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})