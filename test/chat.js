const chat = artifacts.require("chat");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("chat", function (/* accounts */) {
  it("should assert true", async function () {
    await chat.deployed();
    return assert.isTrue(true);
  });
});
