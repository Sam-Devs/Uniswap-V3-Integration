require("dotenv").config();
const { ethers } = require("ethers");
const { Token } = require("@uniswap/sdk-core");
const { Pool, TickListDataProvider, Tick } = require("@uniswap/v3-sdk");
const IUniswapV3PoolABI = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json");


const poolAddress = "0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8";
const maninnetProvider = process.env.MAINNET;
const provider = new ethers.providers.JsonRpcProvider(maninnetProvider);

const poolContract = new ethers.Contract(poolAddress, IUniswapV3PoolABI.abi , provider);

const tokenAddresses = {
    token0: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    token1: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    // poolAddress: "0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8"
}

// create a Pool
const main = async () => {
    try {
        const token0 = new Token(1, tokenAddresses.token0, 6, "USDC", "USD Coin");
        const token1 = new Token(1, tokenAddresses.token1, 18, "WETH", "Wrapped Ether");
        const poolFee = await poolContract.fee();
        const slot0 = await poolContract.slot0();
        const poolLiquidity = await poolContract.liquidity();
        const tickSpacing = await poolContract.tickSpacing();

        const nearestTick = Math.floor(slot0[1] / tickSpacing) * tickSpacing;
        const tickLowerIndex = nearestTick - (60 * 100);
        const tickUpperIndex = nearestTick + (60 * 100);

        const tickLowerData = await poolContract.ticks(tickLowerIndex);
        const tickUpperData = await poolContract.ticks(tickUpperIndex);

        const tickLower = new Tick({
            index: tickLowerData,
            liquidityGross: tickLowerData.liquidityGross,
            liquidityNet: tickLowerData.liquidityNet
        })
        const tickUpper = new Tick({
            index: tickUpperData,
            liquidityGross: tickUpperData.liquidityGross,
            liquidityNet: tickUpperData.liquidityNet
        })
        const tickList = new TickListDataProvider([tickLower, tickUpper], tickSpacing);

        
        const pool = new Pool(
            token0,
            token1,
            poolFee,
            slot0[0],
            poolLiquidity,
            slot0[1],
            tickList
        )
        console.log(pool);
    } catch (error) {
        console.log(error);
    }
}
main();