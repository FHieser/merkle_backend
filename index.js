const express = require('express');
const { send } = require('express/lib/response');
const cors = require('cors')

const Web3 = require('web3');
const merkletreejs = require('./merkle_tree.js');

const app = express()
app.use(cors())
const port = 3000

app.get('/', (req, res) => {

    //if Query does not contain Address fail
    try {
        let address = req.query.address;

        //If the send Address is not correctly recognized as a valid ethereum Blockchain address
        if (!Web3.utils.isAddress(address)) {
            //Send error
            res.status(406).send({ message: "Not a recognizable Address" })
            return
        }

        //check if address is verified in the merkletree
        //and get hexProof 
        const { isVerified, hexProof } = merkletreejs.getProof(address)

        //If everything went accordingly send hexProof via the response data
        // Example Axios getter Function to get Info
        //axios.get("http://localhost:3000/",{params: {address:"0X5B38DA6A701C568545DCFCB03FCB875F56BEDDC4"}})
        //.then(response=>this.infoContent=response.data.proof)
        res.status(200).json({ proof: hexProof, isVerified: isVerified })
    }
    catch (e) {
        res.status(400).send({ message: "Could not process." })
        return
    }

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})