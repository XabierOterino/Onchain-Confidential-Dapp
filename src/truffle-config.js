/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * https://trufflesuite.com/docs/truffle/reference/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

 require('dotenv').config();
 const sapphire = require('@oasisprotocol/sapphire-paratime');
 // const mnemonic = process.env["MNEMONIC"];
 // const infuraProjectId = process.env["INFURA_PROJECT_ID"];
  
 const HDWalletProvider = require('@truffle/hdwallet-provider');
 
 module.exports = {

 
   networks: {
     emerald: {
       provider: () =>
         new HDWalletProvider([process.env.PRIVATE_KEY], "https://testnet.emerald.oasis.dev"),
       network_id: 0xa515,
     },
     sapphire: {
       provider: () =>
         sapphire.wrap(new HDWalletProvider([process.env.PRIVATE_KEY], "https://testnet.sapphire.oasis.dev")),
       network_id: 0x5aff,
     },
     fantom : {
      provider : () => 
        new HDWalletProvider([process.env.PRIVATE_KEY], "https://rpc.testnet.fantom.network"),
      network_id: 0xfa2,
     },

   },
 
   mocha: {
 // timeout: 100000
   },
 
   // Configure your compilers
   compilers: {
     solc: {
       version: "0.8.13",      // Fetch exact version from solc-bin
     }
   }
 };