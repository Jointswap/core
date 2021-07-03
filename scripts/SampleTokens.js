async function main() {
    // We get the contract to deploy
    const Token1 = await ethers.getContractFactory("Token1");
    const t1 = await Token1.deploy();

    console.log("Greeter deployed to:", greeter.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });