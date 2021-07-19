require("dotenv").config();
const { ethers} = require("ethers");
const IUniswapV3Pool = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json");
const { Token} = require("@uniswap/sdk-core");
const { Pool} = require("@uniswap/v3-sdk")

//  pool contract address
const poolAddress = "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8";
const mainnet = process.env.MAINNET;
const provider = new ethers.providers.JsonRpcProvider(mainnet);

const poolContract = new ethers.Contract(poolAddress, IUniswapV3Pool.abi, provider);

// token addresses
const tokenAddresses = {
    token0: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    token1: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
}

// create a pool
const createPool = async() => {
    try {
        // Token Instance
    const tokenA = new Token(1, tokenAddresses.token0, 6, "USDC", "USD Coin");
    const tokenB = new Token(1, tokenAddresses.token1, 18, "WETH", "Wrapped Ether");

    // Pool Fee
    const poolFee = await poolContract.fee();

    // Pool Price
    const poolPrice = await poolContract.slot0();
    console.log(poolPrice);

    // const pool = new Pool(
    //     tokenA: tokenAddresses.token0,
    //     tokenB: tokenAddresses.token1,
    //     poolFee: 
    //     poolPrice
    //     poolTick
    //     tickList
    // )
    } catch (error) {
        console.log(error);
    }
    
}
createPool();