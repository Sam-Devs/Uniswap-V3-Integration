require("dotenv").config();
const { ethers } = require("ethers");
const {
  Pool,
  TickListDataProvider,
  Tick,
  Trade,
  Route,
  priceToClosestTick,
  Position,
} = require("@uniswap/v3-sdk");
const INonfungiblePositionManager = require("@uniswap/v3-periphery/artifacts/contracts/interfaces/INonfungiblePositionManager.sol/INonfungiblePositionManager.json");
const IUniswapV3PoolABI = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json");
const { CurrencyAmount, Price } = require("@uniswap/sdk-core");

// Provider
const maninnetProvider = process.env.MAINNET;
const provider = new ethers.providers.JsonRpcProvider(maninnetProvider);

// Signer
const signer = new ethers.Wallet.createRandom();
const account = signer.connect(provider);

//  pool contract address
const poolAddress = "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8";
const positionManagerAddress = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";

// Pool Contract
const poolContract = new ethers.Contract(
  poolAddress,
  IUniswapV3PoolABI.abi,
  provider
);
// Pool Contract
const poolContract = new ethers.Contract(
  positionManagerAddress,
  INonfungiblePositionManager.abi,
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

  const mintTransaction = await positionManager.mint(mintParams, {
    value: value,
    gasPrice: 20e9,
  });

  const lowerPrice = CurrencyAmount.fromRawAmount(
    tokenAddresses.token0,
    "1500000000"
  );
  const upperPrice = CurrencyAmount.fromRawAmount(
    tokenAddresses.token0,
    "3000000000"
  );

  const lowerTick = priceToClosestTick(
    new Price(token1, token0, lowerPrice.numerator, lowerPrice.denominator)
  );
  const upperTick = priceToClosestTick(
    new Price(token1, token0, upperPrice.numerator, upperPrice.denominator)
  );

  const lowerTickSpacing = Math.floor(lowerTick / tickSpacing) * tickSpacing;
  const upperTickSpacing = Math.floor(upperTick / tickSpacing) * tickSpacing;
  console.log(
    `To provide liquidity for the 1500-3000 USDC/WETH, you need to create a position between ${lowerTickSpacing} and ${upperTickSpacing} tick`
  );

  const position = new Position({
    pool: pool,
    liquidity: ethers.utils.parseEther("5.0"),
    tickLower: lowerTickSpacing,
    tickUpper: upperTickSpacing,
  });

  const mintAmounts = position.mintAmounts;

  const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
  const mintParams = {
    token0: tokenAddresses.token0,
    token1: tokenAddresses.token1,
    fee: pool.fee,
    tickLower: lowerTickSpacing,
    tickUpper: upperTickSpacing,
    amount0Desired: mintAmounts.amount0.toString(),
    amount1Desired: mintAmounts.amount1.toString(),
    amount0Min: mintAmounts.amount0.toString(),
    amount1Min: mintAmounts.amount1.toString(),
    recipient: signer.address,
    deadline: deadline,
  };
};
addLiquidity();
