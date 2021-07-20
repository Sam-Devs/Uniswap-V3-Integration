require("dotenv").config();
const { ethers} = require("ethers");
const ISwapRouter = require("@uniswap/v3-periphery/artifacts/contracts/interfaces/ISwapRouter.sol/ISwapRouter.json");
// Provider
const mainnet = process.env.MAINNET;
const provider = new ethers.providers.JsonRpcProvider(mainnet);
// Router Contract
const routerAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564"
const routerContract = new ethers.Contract(routerAddress, ISwapRouter.abi , provider);

// Signer
const signer = new ethers.Wallet.createRandom();
const account = signer.connect(provider);
const router = routerContract.connect(account);

const swap = async() => {
  
}
swap();