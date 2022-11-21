const keccak256 = require("web3").utils.keccak256;

const PrivacyContract = artifacts.require("PrivacyContract");
const TestHelper = artifacts.require("TestHelper")

async function exerciseContract() {
  const pc = await PrivacyContract.deployed();
  const th = await TestHelper.deployed();

  // We will use this sample password for this example
  const seed = "pass123"
  await pc.setPassword(seed) // introduce it to privacy contract
  const passwordBytes = await th.seedToBytes(seed) // compute the bytes password in this helper contract
  console.log(`\nGenerated password: ${passwordBytes}`);

  // Read the storage slot of the contract to check wether the data of each user is enecrypted or not
  const storageSlot = await new Promise((resolve, reject) => {
    const getStoragePayload = {
      method: "eth_getStorageAt",
      params: [
       '0x6740eDDAfb12903c17720e69520DCF488A481479', 
        keccak256(
          "0x" + "00".repeat(12) + '0x6740eDDAfb12903c17720e69520DCF488A481479' + "00".repeat(32)
        ),
        "latest",
      ],
      jsonrpc: "2.0",
      id: "test",
    };
    pc.contract.currentProvider.send(getStoragePayload, (err, res) => {
      if (err) reject(err);
      else resolve(res.result);
    });
  });
  console.log(`The  storage slot contains ${storageSlot}.`);

}

module.exports = async function (callback) {
  try {
    await exerciseContract();
  } catch (e) {
    console.error(e);
  }
  callback();
};