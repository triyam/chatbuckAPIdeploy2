var chat = artifacts.require("./Chat.sol");

module.exports = function(deployer) {
	deployer.deploy(chat);
};