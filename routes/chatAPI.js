const express = require("express");
const router = new express();
const User = require("../model/userSchema");

module.exports = router;

const chatFunction = require("../middleware/chatFunction");

router.get("/getUsers", (req, res) => {});

router.post("/createAccount", async (req, res) => {
  if (
    req.body.username === null &&
    req.body.username === "" &&
    req.body.username === undefined
  ) {
    res.status(500).send({ error: "Invalid username" });
  } else if (
    req.body.email === null &&
    req.body.email === "" &&
    req.body.email === undefined
  ) {
    res.status(500).send({ error: "Invalid email" });
  } else if (
    req.body.phone === null &&
    req.body.phone === "" &&
    req.body.phone === undefined
  ) {
    res.status(500).send({ error: "Invalid phone" });
  } else if (
    req.body.publicKey === null &&
    req.body.publicKey === "" &&
    req.body.publicKey === undefined
  ) {
    res.status(500).send({ error: "Invalid publicKey" });
  } else {
    const isUserExist = await User.findOne({ phone: req.body.phone });
    if (isUserExist) {
      return res.status(400).send({ error: "Email Already Registered" });
    }
    const { username, email, phone, publicKey } = req.body;

    try {
      chatFunction.contract
        .deploy({ data: chatFunction.bytecode })
        .send({ from: publicKey, gas: 14700000 })
        .on("receipt", (receipt) => {
          console.log("Contract Address: ", receipt.contractAddress);
        })
        .then(async (initialContract) => {
          const accountCreated = await initialContract.methods
            .createAccount(username, email, phone)
            .send({ from: publicKey });
          console.log(accountCreated);
          if (accountCreated["status"] === true) {
            console.log(
              `Account name: ${username}, email ${email}, phone ${phone}, Created on address: ${publicKey}`
            );
            const user = new User({
              username,
              email,
              phone,
              publicKey,
            });
            const newUser = await user.save();
            return res
              .status(201)
              .json({ newUser, message: "Account Created Successfully" });
          } else {
            console.log("cant able to create user");
            res.send(false);
          }
        });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }
});

router.post("/addFriend", (req, res) => {
  if (
    req.body.username === null &&
    req.body.username === "" &&
    req.body.username === undefined
  ) {
    res.status(500).send({ error: "Invalid username" });
  } else if (
    req.body.publicKey === null &&
    req.body.publicKey === "" &&
    req.body.publicKey === undefined
  ) {
    res.status(500).send({ error: "Invalid publicKey" });
  } else {
    const username = req.body.username;
    const publicKey1 = req.body.fromPublicKey;
    const publicKey2 = req.body.toPublicKey;

    try {
      chatFunction.contract
        .deploy({ data: chatFunction.bytecode })
        .send({ from: publicKey1, gas: 14700000 })
        .on("receipt", (receipt) => {
          console.log("Contract Address: ", receipt.contractAddress);
        })
        .then(async (initialContract) => {
          // initialContract.methods.createAccount().call(async (err, data) => {
          //   console.log("Messages: ", data);
          //   res.send(data)

          var friendAdded = await initialContract.methods
            .addFriend(publicKey2, username)
            .send({ from: publicKey1 });
          // if (friendAdded["status"] === true) {
          //   console.log(`User exist`);
          //   res.send(true)
          // } else {
          //   console.log("Cant find user");
          //   res.send(false)
          // }
          console.log(friendAdded);
        });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }
});

router.post("/sendMesssage", (req, res) => {
  if (
    req.body.username === null &&
    req.body.username === "" &&
    req.body.username === undefined
  ) {
    res.status(500).send({ error: "Invalid username" });
  } else if (
    req.body.publicKey === null &&
    req.body.publicKey === "" &&
    req.body.publicKey === undefined
  ) {
    res.status(500).send({ error: "Invalid publicKey" });
  } else {
    const { publicKey1, publicKey2, message } = req.body;

    try {
      chatFunction.contract
        .deploy({ data: chatFunction.bytecode })
        .send({ from: publicKey1, gas: 14700000 })
        .on("receipt", (receipt) => {
          console.log("Contract Address: ", receipt.contractAddress);
        })
        .then(async (initialContract) => {
          // initialContract.methods.createAccount().call(async (err, data) => {
          //   console.log("Messages: ", data);
          //   res.send(data)

          var messageSent = await initialContract.methods
            .sendMessage(publicKey2, message)
            .send({ from: publicKey1 });
          console.log(messageSent);
          const user = await User.findOne({});
          // if (friendAdded["status"] === true) {
          //   console.log(`Message Sent`);
          //   res.send(true)
          // } else {
          //   console.log("Cant send the message");
          //   res.send(false)
          // }

          //   var messageSent = await initialContract.methods.sendMessage(publicKey2, message).call(async (err, data) => {
          //     console.log("Messages: ", data);
          //     res.send(data)
          // })
        });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }
});

router.post("/readMessage", (req, res) => {
  if (
    req.body.fromPublicKey === null &&
    req.body.fromPublicKey === "" &&
    req.body.fromPublicKey === undefined
  ) {
    res.status(500).send({ error: "Invalid fromPublicKey" });
  } else {
    const publicKey1 = req.body.fromPublicKey;

    try {
      chatFunction.contract
        .deploy({ data: chatFunction.bytecode })
        .send({ from: publicKey1, gas: 14700000 })
        .on("receipt", (receipt) => {
          console.log("Contract Address: ", receipt.contractAddress);
        })
        .then(async (initialContract) => {
          //   initialContract.methods.createAccount().call(async (err, data) => {
          //     console.log("Messages: ", data);
          //     res.send(data)

          var friendAdded = await initialContract.methods
            .readMessage(publicKey1)
            .call(async (err, data) => {
              console.log("Messages: ", data);
              res.send(data);
            });
          console.log(friendAdded);
        });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }
});

router.post("/getUsername", (req, res) => {
  if (
    req.body.fromPublicKey === null &&
    req.body.fromPublicKey === "" &&
    req.body.fromPublicKey === undefined
  ) {
    res.status(500).send({ error: "Invalid fromPublicKey" });
  } else {
    const publicKey1 = req.body.fromPublicKey;

    try {
      chatFunction.contract
        .deploy({ data: chatFunction.bytecode })
        .send({ from: publicKey1, gas: 14700000 })
        .on("receipt", (receipt) => {
          console.log("Contract Address: ", receipt.contractAddress);
        })
        .then(async (initialContract) => {
          //   initialContract.methods.createAccount().call(async (err, data) => {
          //     console.log("Messages: ", data);
          //     res.send(data)

          var friendAdded = await initialContract.methods
            .getUsername(publicKey1)
            .call(async (err, data) => {
              console.log("Messages: ", data);
              res.send(data);
            });
          console.log(friendAdded);
        });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }
});
