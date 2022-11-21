const PrivacyContract = artifacts.require("PrivacyContract");
const TestHelper = artifacts.require("TestHelper");

module.exports = function(deployer) {
  deployer.deploy(PrivacyContract);
  deployer.deploy(TestHelper);
};
