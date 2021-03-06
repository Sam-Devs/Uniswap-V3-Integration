require("dotenv").config();
const { ethers } = require("ethers");
const IUniswapV3Pool = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json");
const { Token } = require("@uniswap/sdk-core");
const { Pool, TickListDataProvider, Tick } = require("@uniswap/v3-sdk");

//  pool contract address
const poolAddress = "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8";
const mainnet = process.env.MAINNET;
const provider = new ethers.providers.JsonRpcProvider(mainnet);

// Pool Contract
const poolContract = new ethers.Contract(
  poolAddress,
  IUniswapV3Pool.abi,
  provider
);

// Token Address Object
const tokenAddresses = {
  token0: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  token1: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
};

// create a pool
const createPool = async () => {
  try {
    // Token Address Instance
    const tokenA = new Token(1, tokenAddresses.token0, 6, "USDC", "USD Coin");
    const tokenB = new Token(1, tokenAddresses.token1, 18, "WETH", "Wrapped Ether");

    // Fee Method from the pool contract
    const poolFee = await poolContract.fee();

    // Price Method from the pool contract
    const slot0 = await poolContract.slot0();
    // console.log(slot0);

    // Liquidity Method from the pool contract
    const poolLiquidity = await poolContract.liquidity(); 

    // Spacing Method from the pool contract
    const tickSpacing = await poolContract.tickSpacing();
    
    // Getting the nearest index of the tick
    const nearestIndex = Math.floor(slot0[1] / tickSpacing) * tickSpacing;

    // Calculating the nearest index range of the tick
    const tickLowerIndex = nearestIndex - (60 * 100);
    const tickUpperIndex = nearestIndex + (60 * 100);

    // Ticks Method from the pool contract
    const tickLowerData = await poolContract.ticks(tickLowerIndex);
    const tickUpperData = await poolContract.ticks(tickUpperIndex);

    // Creating the Tick instance
    const tickLower = new Tick({
      index: tickLowerIndex,
      liquidityGross: tickLowerData.liquidityGross,
      liquidityNet: tickLowerData.liquidityNet
    })

    const tickUpper = new Tick({
      index: tickUpperIndex,
      liquidityGross: tickUpperData.liquidityGross,
      liquidityNet: tickUpperData.liquidityNet
    })

    const tickList = new TickListDataProvider([tickLower, tickUpper], tickSpacing);

    const pool = new Pool(
      tokenA,
      tokenB,
      poolFee,
      slot0[0],
      poolLiquidity,
      slot0[1],
      tickList,
    )
    console.log(pool);
  } catch (error) {
    console.log(error);
  }
};
createPool();
