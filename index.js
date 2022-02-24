const express = require('express');
const { send } = require('express/lib/response');
const cors = require('cors')

const Web3 = require('web3');
const merkletreejs = require('./merkle_tree.js');

const app = express()
app.use(cors())
const port = 3000

app.get('/', (req, res) => {

    try {
        let address = req.query.address;
        
        if (!Web3.utils.isAddress(address)) {
            res.status(406).send({ message: "Not a recognizable Address" })
            return
        }

        const { isVerified, hexProof } = merkletreejs.getProof(address)
        
        if (!isVerified) {
            res.status(406).send({ message: "Not a whitelisted Address" })
            return
        }
        res.status(200).json({ proof: hexProof }).send()
        return
    }
    catch (e) {
        res.status(400).send({ message: "Could not process." })
        return
    }

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})