const solc = require("solc");
const fs = require("fs")
const Web3 = require("web3");

const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const Provider = require('@truffle/hdwallet-provider');
// const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"))

privatekey = process.env.PRIVATE_KEY
rpcurl = "wss://rpc-mumbai.maticvigil.com/ws/v1/" + process.env.INFURA_PROJECT_ID
const providers = new Provider(privatekey, rpcurl)
const web3 = new Web3(providers)

const file = fs.readFileSync("./contracts/Chat.sol").toString();
var input = {
  language: "Solidity",
  sources: {
    "Chat.sol": {
      content: file,
    },
  },

  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));

const ABI = output.contracts["Chat.sol"]["Chat"].abi;
const bytecode = output.contracts["Chat.sol"]["Chat"].evm.bytecode.object;

const contract = new web3.eth.Contract(ABI)

module.exports = {
  ABI: ABI, 
  bytecode: bytecode, 
  contract:contract 
}



