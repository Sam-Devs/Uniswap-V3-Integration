require("dotenv").config();
const { ethers } = require("ethers");
const INonfungiblePositionManager = require("@uniswap/v3-periphery/artifacts/contracts/interfaces/INonfungiblePositionManager.sol/INonfungiblePositionManager.json");

// Provider
const maninnetProvider = process.env.MAINNET;
const provider = new ethers.providers.JsonRpcProvider(maninnetProvider);


// Signer
const signer = new ethers.Wallet.createRandom();
const account = signer.connect(provider);

const positionManagerAddress = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";
const positionManagerContract = new ethers.Contract(positionManagerAddress, INonfungiblePositionManager.abi, provider);

const positionManager = positionManagerContract.connect(account);

console.log(positionManager);