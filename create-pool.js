require("dotenv").config();
const { ethers} = require("ethers");
const IUniswapV3Pool = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json");
const { Token} = require("@uniswap/sdk-core");
const { Pool, TickListDataProvider, Tick} = require("@uniswap/v3-sdk")

//  pool contract address
const poolAddress = "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8";
const mainnet = process.env.MAINNET;
const provider = new ethers.providers.JsonRpcProvider(mainnet);

// Pool Contract
const poolContract = new ethers.Contract(poolAddress, IUniswapV3Pool.abi, provider);

// Token Address Object
const tokenAddresses = {
    token0: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    token1: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
}

// create a pool
const createPool = async() => {

    // Token Addresses
    const tokenA = new Token(1, tokenAddresses.token0, 6, "USDC", "USD Coin");
    const tokenB = new Token(1, tokenAddresses.token1, 18, "WETH", "Wrapped Ether");

    // Pool Fee
    const poolFee = await poolContract.fee();

    // Pool Price
    const slot0 = await poolContract.slot0();

    // Pool Liquidity
    const poolLiquidity = await poolContract.liquidity();

    // Pool Tick
    // const poolTick = await poolContract.slot0();
    
    // Pool Instance
    const pool = new Pool(
        tokenA:
        tokenB:
        poolFee:
        slot0[0]:
        poolLiquidity:
        slot0[1]:
        tickList:
    )
}
createPool();