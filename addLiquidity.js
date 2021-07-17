require("dotenv").config();
const { ethers } = require("ethers");
const ISwapRouterABI = require("@uniswap/v3-periphery/artifacts/contracts/interfaces/ISwapRouter.sol/ISwapRouter.json");

// Provider
const maninnetProvider = process.env.MAINNET;
const provider = new ethers.providers.JsonRpcProvider(maninnetProvider);

const routerAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
const routerContract = new ethers.Contract(routerAddress, ISwapRouterABI.abi, provider);