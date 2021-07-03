const { ChainId } = require("@1coinswap/sdk")

const chainId = getChainId()

// Defining bytecode and abi from original contract on mainnet to ensure bytecode matches and it produces the same pair code hash
if (chainId != "56") {

// temporary 
//if (chainId != chainId) {
 console.log('not bsc so deploy with ABI')
 // console.log('temporarily forcing all with no ABI')


  const {
    bytecode,
    abi,
  } = require("../deployments/bsc/UniswapV2Factory.json");

  module.exports = async function ({
    ethers,
    getNamedAccounts,
    deployments,
    getChainId,
  }) {
    const { deploy } = deployments;

    const { deployer, dev } = await getNamedAccounts();


    await deploy("UniswapV2Factory", {
      contract: {
        abi,
        bytecode,
      },
      from: deployer,
      args: [dev],
      log: true,
      deterministicDeployment: false,
    });
  };


} else {

  console.log('Not using any ABI')


  module.exports = async function ({
    ethers,
    getNamedAccounts,
    deployments,
    getChainId,
  }) {
    const { deploy } = deployments;

    const { deployer, dev } = await getNamedAccounts();

    await deploy("UniswapV2Factory", {
      from: deployer,
      args: [dev],
      log: true,
      deterministicDeployment: false,
    });
  };

}


module.exports.tags = ["UniswapV2Factory", "AMM"];
