require("dotenv").config();
const { ethers } = require("ethers");
const { Token } = require("@uniswap/sdk-core");
const { Pool } = require("@uniswap/v3-sdk");
const IUniswapV3PoolABI = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json");


const poolAddress = tokenAddresses.poolAddress;
const maninnetProvider = process.env.MAINNET;
const provider = new ethers.providers.JsonRpcProvider(maninnetProvider);

const poolContract = new ethers.Contract(poolAddress, IUniswapV3PoolABI.abi , provider);

const tokenAddresses = {
    token0: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    token1: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    poolAddress: "0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8"
}

// create a Pool
const main = async () => {
    const token0 = new Token(1, tokenAddresses.token0, 6, "USDC", "USD Coin");
    const token1 = new Token(1, tokenAddresses.token1, 18, "WETH", "Wrapped Ether");
    const poolFee = poolContract.fee();
    const slot0 = poolContract.slot0();
    console.log(slot0);
    // const pool = new Pool(
    //     token0,
    //     token1,
    //     poolFee,
    //     poolPrice,
    //     poolLiquidity,
    //     poolTick,
    //     tickList
    // )
}