const { ChainId } = require("@1coinswap/sdk")


const SUSHI = {
  [ChainId.MATIC]: '0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a',
  [ChainId.ROPSTEN]: '0xf68f9048629ffD070Aa919435a2bfA814AbC35a0'
}

module.exports = async function ({ ethers, deployments, getNamedAccounts }) {
  const { deploy } = deployments

  const { deployer, dev } = await getNamedAccounts()

  const chainId = await getChainId()

  let sushiAddress;

  if (chainId === '31337') {
    sushiAddress = (await deployments.get("JointToken")).address
  } else if (chainId in SUSHI) {
    sushiAddress = SUSHI[chainId]
  } else {
    try {
      sushiAddress = (await deployments.get("JointToken")).address
    } catch (error) {
      throw Error("No SUSHI!")
    }
    
  }

  await deploy("MiniChefV2", {
    from: deployer,
    args: [sushiAddress],
    log: true,
    deterministicDeployment: false
  })

  const miniChefV2 = await ethers.getContract("MiniChefV2")
  if (await miniChefV2.owner() !== dev) {
    console.log("Transfer ownership of MiniChef to dev")
    await (await miniChefV2.transferOwnership(dev, true, false)).wait()
  }
}

module.exports.tags = ["MiniChefV2"]
module.exports.dependencies = ["UniswapV2Factory", "UniswapV2Router02"]
