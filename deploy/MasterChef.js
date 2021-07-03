module.exports = async function ({ ethers, deployments, getNamedAccounts }) {
  const { deploy } = deployments

  const { deployer, dev } = await getNamedAccounts()

  const sushi = await ethers.getContract("JointToken")
  
  const { address } = await deploy("MasterChef", {
    from: deployer,
    args: [sushi.address, dev, "100000", "8837000", "125120000"],
    log: true,
    deterministicDeployment: false
  })

  // if (await sushi.owner() !== address) {
  //   // Transfer Sushi Ownership to Chef
  //   console.log("Transfer Sushi Ownership to Chef")
  //   await (await sushi.transferOwnership(address)).wait()
  // }

  // const masterChef = await ethers.getContract("MasterChef")
  // if (await masterChef.owner() !== dev) {
  //   // Transfer ownership of MasterChef to dev
  //   console.log("Transfer ownership of MasterChef to dev")
  //   await (await masterChef.transferOwnership(dev)).wait()
  // }
}

module.exports.tags = ["MasterChef"]
module.exports.dependencies = ["UniswapV2Factory", "UniswapV2Router02", "JointToken"]