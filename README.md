# merkle_backend

## Project setup
```
npm install
```

### Run Project

Navigate to the folder, where the files reside, then:
```
node .
```
### Access Service

The REST API is accessible with the port defined in the index.js file
A GET on the basic URL should do the trick
I tested it with Axios.
See below:
```
let info;
axios.get("http://localhost:3000/",{params: address:"0X5B38DA6A701C568545DCFCB03FCB875F56BEDDC4"}})
.then(response=>this.info=response.data.proof)
```
