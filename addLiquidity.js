require("dotenv").config();
const { ethers } = require("ethers");
const { Pool, TickListDataProvider, Tick, Trade, Route } = require("@uniswap/v3-sdk");
const INonfungiblePositionManager = require("@uniswap/v3-periphery/artifacts/contracts/interfaces/INonfungiblePositionManager.sol/INonfungiblePositionManager.json");
const IUniswapV3PoolABI = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json");

// Provider
const maninnetProvider = process.env.MAINNET;
const provider = new ethers.providers.JsonRpcProvider(maninnetProvider);

// Signer
const signer = new ethers.Wallet.createRandom();
const account = signer.connect(provider);

//  pool contract address
const poolAddress = "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8";

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

const addLiquidity = async () => {
// Token Address Instance
const tokenA = new Token(1, tokenAddresses.token0, 6, "USDC", "USD Coin");
const tokenB = new Token(
  1,
  tokenAddresses.token1,
  18,
  "WETH",
  "Wrapped Ether"
);

// Pool Fee
const poolFee = await poolContract.fee();

// Pool Price
const slot0 = await poolContract.slot0();

// Pool Liquidity
const liquidity = await poolContract.liquidity();

// Tick Spacing
const tickSpacing = await poolContract.tickSpacing();

// Get the nearest index
const nearestIndex = Math.floor(slot0[1] / tickSpacing) * tickSpacing;

// Create a tick index
const tickLowerIndex = nearestIndex - 60 * 100;
const tickUpperIndex = nearestIndex + 60 * 100;

// Tick Data
const tickLowerData = await poolContract.ticks(tickLowerIndex);
const tickUpperData = await poolContract.ticks(tickUpperIndex);

// Tick Instance
const tickLower = new Tick({
  index: tickLowerIndex,
  liquidityGross: tickLowerData.liquidityGross,
  liquidityNet: tickLowerData.liquidityNet,
});
const tickUpper = new Tick({
  index: tickUpperIndex,
  liquidityGross: tickUpperData.liquidityGross,
  liquidityNet: tickUpperData.liquidityNet,
});

// Tick List
const tickList = new TickListDataProvider(
  [tickLower, tickUpper],
  tickSpacing
);
const pool = new Pool(
  tokenA,
  tokenB,
  poolFee,
  slot0[0],
  liquidity,
  slot0[1],
  tickList
);
console.log(pool);

    const mintTransaction = await positionManager.mint(
        mintParams,
        {value: value, gasPrice: 20e9}
        )

        const mintParams = {
            token0: tokenAddresses.token0,
            token1: tokenAddresses.token1,
            fee:
            tickLower:
            tickUpper:
            amount0Desired:
            amount1Desired:
            amount0Min:
            amount1Min:
            recipient:
            deadline:
        }
    }
    main();