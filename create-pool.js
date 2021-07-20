require("dotenv").config();
const { ethers} = require("ethers");
const IUniswapV3Pool = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json");
const { Token} = require("@uniswap/sdk-core");
const { Pool, TickListDataProvider, Tick} = require("@uniswap/v3-sdk")

//  pool contract address
const poolAddress = "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8";
const mainnet = process.env.MAINNET;
const provider = new ethers.providers.JsonRpcProvider(mainnet);

const poolContract = new ethers.Contract(poolAddress, IUniswapV3Pool.abi, provider);

// create a pool
const createPool = async() => {
    // Pool Instance
    const pool = new Pool(
        tokenA:
        tokenB:
        poolFee:
        poolPrice:
        poolLiquidity:
        poolTick:
        tickList:
    )
}
createPool();