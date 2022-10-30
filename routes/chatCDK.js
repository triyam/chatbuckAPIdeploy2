const express = require("express")

const router = new express()

module.exports = router


// const solc = require("solc");
// const fs = require("fs")
// const Web3 = require("web3");
// // const web3 = new Web3()
// // const wallet = web3.eth.accounts.create();
// const Provider = require('@truffle/hdwallet-provider');

// const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"))
// // privatekey = "b2c89e66e3b29a59775ecd5c080a15445169a615779dbca002eb801c077683da"
// // rpcurl = "https://polygon-mumbai.infura.io/v3/9cc7233d5cec431db373babf55bdb69a"
// // const providers = new Provider(privatekey, rpcurl)
// // const web3 = new Web3(providers)
// // const wallet = web3.create()
// // console.log(`Private Key: \n${wallet.privateKey}`)
// // console.log(`Address: \n${wallet.address}`)
// // console.log(wallet);

// const file = fs.readFileSync("./contracts/Chat.sol").toString();
// var input = {
//   language: "Solidity",
//   sources: {
//     "Chat.sol": {
//       content: file,
//     },
//   },

//   settings: {
//     outputSelection: {
//       "*": {
//         "*": ["*"],
//       },
//     },
//   },
// };

// var output = JSON.parse(solc.compile(JSON.stringify(input)));

// ABI = output.contracts["Chat.sol"]["Chat"].abi;
// bytecode = output.contracts["Chat.sol"]["Chat"].evm.bytecode.object;

// contract = new web3.eth.Contract(ABI)

// router.post("/createAccount", (req, res) => {

//   if (req.body.username === null && req.body.username === "" && req.body.username === undefined) {
//     res.status(500).send({ error: "Invalid username" });
//   } else if (req.body.email === null && req.body.email === "" && req.body.email === undefined) {
//     res.status(500).send({ error: "Invalid email" });
//   } else if (req.body.phone === null && req.body.phone === "" && req.body.phone === undefined) {
//     res.status(500).send({ error: "Invalid phone" });
//   } else if (req.body.publicKey === null && req.body.publicKey === "" && req.body.publicKey === undefined) {
//     res.status(500).send({ error: "Invalid publicKey" });
//   } else {

//     const username = req.body.username
//     const email = req.body.email
//     const phone = req.body.phone
//     const publicKey1 = req.body.publicKey

//     try {
//       contract
//         .deploy({ data: bytecode })
//         .send({ from: publicKey1, gas: 14700000 })
//         .on("receipt", (receipt) => {
//           console.log("Contract Address: ", receipt.contractAddress);
//         })
//         .then(async (initialContract) => {
//           const accountCreated = await initialContract.methods.createAccount(username, email, phone).send({ from: publicKey1 })
//           console.log(accountCreated["status"]);
//           if (accountCreated["status"] === true) {
//             console.log(`Account name: ${username}, email ${email}, phone ${phone}, Created on address: ${publicKey1}`);
//             res.send(true)
//           } else {
//             console.log("cant able to create user");
//             res.send(false)
//           }

//         })
//     } catch (error) {
//       console.log(error);
//     }
//   }
// })


// router.post("/checkUserExists", (req, res) => {

//   if (req.body.publicKey === null && req.body.publicKey === "" && req.body.publicKey === undefined) {
//     res.status(500).send({ error: "Invalid publicKey" });

//   } else {

//     const publicKey1 = req.body.publicKey

//     try {
//       contract
//         .deploy({ data: bytecode })
//         .send({ from: publicKey1, gas: 14700000 })
//         .on("receipt", (receipt) => {
//           console.log("Contract Address: ", receipt.contractAddress);
//         })
//         .then(async (initialContract) => {
//           // initialContract.methods.createAccount().call(async (err, data) => {
//           //   console.log("Messages: ", data);
//           //   res.send(data)
//           var isUserExist = await initialContract.methods.checkUserExists(publicKey1).send({ from: publicKey1 })
//           if (isUserExist["status"] === true) {
//             console.log(`User exist`);
//             console.log(isUserExist);
//             res.send(true)
//           } else {
//             console.log("Cant find user");
//             res.send(false)
//           }
//         })

//     } catch (error) {
//       console.log(error);
//     }

//   }
// })


// router.post("/getUsername", (req, res) => {
//   if (req.body.publicKey === null && req.body.publicKey === "" && req.body.publicKey === undefined) {
//     res.status(500).send({ error: "Invalid publicKey" });
//   } else {

//     const publicKey1 = req.body.publicKey

//     try {

//       contract
//         .deploy({ data: bytecode })
//         .send({ from: publicKey1, gas: 14700000 })
//         .on("receipt", (receipt) => {
//           console.log("Contract Address: ", receipt.contractAddress);
//         })
//         .then(async (initialContract) => {
//           initialContract.methods.getUsername(publicKey1).call(async (err, data) => {
//             console.log("Accounts: ", data);
//             res.send(data)
//           })
//           var isUserExist = await initialContract.methods.getUsername(publicKey1)//.send({ from: publicKey1 })
//           // if (isUserExist["status"] === true) {
//           //   console.log(`User exist`);
//           //   res.send(true)
//           // } else {
//           //   console.log("Cant find user");
//           //   res.send(false)
//           // }
//           console.log(isUserExist);
//         })

//     } catch (error) {
//       console.log(error);
//     }



//   }
// })



// router.post("/checkUserExists", (req, res) => {
//   web3.eth.getAccounts().then((accounts) => {
//     console.log("Account: ", accounts);

//     mainAccount = accounts[0]

//     console.log("Default account: ", mainAccount);
//     contract
//       .deploy({ data: bytecode })
//       .send({ from: mainAccount, gas: 14700000 })
//       .on("receipt", (receipt) => {
//         console.log("Contract Address: ", receipt.contractAddress);
//       })
//       .then(async (initialContract) => {
//         // initialContract.methods.createAccount().call(async (err, data) => {
//         //   console.log("Messages: ", data);
//         //   res.send(data)
//         var isUserExist = await initialContract.methods.checkUserExists(mainAccount).send({ from: mainAccount })
//         if (isUserExist["status"] === true) {
//           console.log(`User exist`);
//           res.send(true)
//         } else {
//           console.log("Cant find user");
//           res.send(false)
//         }
//       })
//   })
// })


// router.post("/addFriend", (req, res) => {

//   if (req.body.username === null && req.body.username === "" && req.body.username === undefined) {
//     res.status(500).send({ error: "Invalid username" });
//   } else if (req.body.publicKey === null && req.body.publicKey === "" && req.body.publicKey === undefined) {
//     res.status(500).send({ error: "Invalid publicKey" });
//   } else {

//     const username = req.body.username
//     const publicKey1 = req.body.publicKey

//     try {

//       contract
//         .deploy({ data: bytecode })
//         .send({ from: publicKey1, gas: 14700000 })
//         .on("receipt", (receipt) => {
//           console.log("Contract Address: ", receipt.contractAddress);
//         })
//         .then(async (initialContract) => {
//           // initialContract.methods.createAccount().call(async (err, data) => {
//           //   console.log("Messages: ", data);
//           //   res.send(data)
        
//             var friendAdded = await initialContract.methods.addFriend(publicKey1, username).send({ from: publicKey1 })
//             // if (isUserExist["status"] === true) {
//             //   console.log(`User exist`);
//             //   res.send(true)
//             // } else {
//             //   console.log("Cant find user");
//             //   res.send(false)
//             // }
//             console.log(friendAdded);

          

//         })

//     } catch (error) {
//       console.log(error);
//     }
// }
// })



// router.post("/checkAlreadyFriends", (req, res) => {
//   web3.eth.getAccounts().then((accounts) => {
//     console.log("Account: ", accounts);

//     mainAccount = accounts[0]
//     mainAccount1 = accounts[1]

//     console.log("Default account: ", mainAccount);
//     contract
//       .deploy({ data: bytecode })
//       .send({ from: mainAccount, gas: 14700000 })
//       .on("receipt", (receipt) => {
//         console.log("Contract Address: ", receipt.contractAddress);
//       })
//       .then(async (initialContract) => {
//         // initialContract.methods.createAccount().call(async (err, data) => {
//         //   console.log("Messages: ", data);
//         //   res.send(data)
//         if (error) {
//           var friendAdded = await initialContract.methods.checkAlreadyFriends(mainAccount, mainAccount2).send({ from: mainAccount })
//           // if (isUserExist["status"] === true) {
//           //   console.log(`User exist`);
//           //   res.send(true)
//           // } else {
//           //   console.log("Cant find user");
//           //   res.send(false)
//           // }
//           console.log(friendAdded);

//         }

//       })
//   })
// })

// router.post("/getMyFriendList", (req, res) => {
//   web3.eth.getAccounts().then((accounts) => {
//     console.log("Account: ", accounts);

//     mainAccount = accounts[0]


//     console.log("Default account: ", mainAccount);
//     contract
//       .deploy({ data: bytecode })
//       .send({ from: mainAccount, gas: 1470000 })
//       .on("receipt", (receipt) => {
//         console.log("Contract Address: ", receipt.contractAddress);
//       })
//       .then(async (initialContract) => {
//         initialContract.methods.getMyFriendList().call(async (err, data) => {
//           console.log("Messages: ", data);
//           res.send(data)
//         })
//       })
//   })
// })


// router.post("/sendMesssage", (req, res) => {

//   web3.eth.getAccounts().then((accounts) => {
//     console.log("Account: ", accounts);

//     mainAccount = accounts[0]
//     mainAccount1 = accounts[1]
//     message12 = "Hello"

//     console.log("Default account: ", mainAccount);
//     contract
//       .deploy({ data: bytecode })
//       .send({ from: mainAccount, gas: 1470000 })
//       .on("receipt", (receipt) => {
//         console.log("Contract Address: ", receipt.contractAddress);
//       })
//       .then(async (initialContract) => {
//         // initialContract.methods.getMessages().call(async (err, data) => {
//         //   console.log("Messages: ", data);
//         //   res.send(data)
//         var sent = initialContract.methods.sendMessage(mainAccount1, message12).send({ from: mainAccount })



//       })
//   })
// })


// router.post("/readMessage", (req, res) => {
//   web3.eth.getAccounts().then((accounts) => {
//     console.log("Account: ", accounts);

//     mainAccount = accounts[0]


//     console.log("Default account: ", mainAccount);
//     contract
//       .deploy({ data: bytecode })
//       .send({ from: mainAccount, gas: 14700000 })
//       .on("receipt", (receipt) => {
//         console.log("Contract Address: ", receipt.contractAddress);
//       })
//       .then(async (initialContract) => {
//         initialContract.methods.readMessage(mainAccount).call(async (err, data) => {
//           console.log("Messages: ", data);
//           res.send(data)
//         })
//       })
//   })
// })




