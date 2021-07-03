module.exports = async function ({ getNamedAccounts, getChainId, deployments }) {
  const { deploy } = deployments

  const { deployer, dev } = await getNamedAccounts()

  const chainId = await getChainId()

   
  if (chainId != 56) {
   
    await deploy("Timelock", {
      from: deployer,
      args: [dev, 172800],
      log: true,
      deterministicDeployment: false
    });

  }
}
  

module.exports.tags = ["Timelock"]
module.exports.dependencies = ["UniswapV2Factory", "UniswapV2Router02"]
