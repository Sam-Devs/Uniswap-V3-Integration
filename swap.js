require("dotenv").config();
const { ethers } = require("ethers");
const ISwapRouter = require("@uniswap/v3-periphery/artifacts/contracts/interfaces/ISwapRouter.sol/ISwapRouter.json");
const { CurrencyAmount, Percent } = require("@uniswap/sdk-core");
const { Trade, Route } = require("@uniswap/v3-sdk");
// Provider
const mainnet = process.env.MAINNET;
const provider = new ethers.providers.JsonRpcProvider(mainnet);
// Router Contract
const routerAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
const routerContract = new ethers.Contract(
  routerAddress,
  ISwapRouter.abi,
  provider
);

// Signer
const signer = new ethers.Wallet.createRandom();
const account = signer.connect(provider);
const router = routerContract.connect(account);

// Token Address Object
const tokenAddresses = {
  token0: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  token1: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
};

const swap = async () => {
  try {
    // Deadline
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

    // Amount In
    const amountIn = CurrencyAmount.fromRawAmount(
      tokenAddresses.token0,
      "5000000000"
    );

    const route = new Route(
      [pool],
      tokenAddresses.token0,
      tokenAddresses.token1
    );
    console.log(`1 USDC can be swapped for ${route.midPrice.toSignificant(6)} WETH`);
    console.log(`1 WETH can be swapped for ${route.midPrice.invert().toSignificant(6)} USDC`);
    const trade = new Trade.exactIn(route, amountIn);
    console.log(`The execution price of this trade is ${trade.executionPrice.toSignificant(6)} WETH for 1 USDC`);
    
    const slippageTolerance = new Percent("50", "10000");
    
    // Amount Out Minimum
    const amountOutMinimum = trade.mininumAmountOut(slippageTolerance);
    console.log(`For 5000 USDC you can get a minimum of ${amountOutMinimum.toSignificant(6)} WETH`);
    const swapParams = {
      path: Buffer.from([tokenAddresses.token0, tokenAddresses.token1]),
      recipient: signer.address,
      deadline: deadline,
      amountIn: ethers.utils.parseUnits(amountIn.toExact(), 6),
      amountOutMinimum: ethers.utils.parseUnits(amountOutMinimum.toExact(), 18)
    }
    const swapTransaction = router.exactInput(
      swapParams,
      {value: value, gasPrice: 20e9}
    );
    console.log(`Swap Transaction Hash: ${swapTransaction.hash}`);
    const swapReceipt = await swapTransaction.wait()
    console.log(`Swap Transaction Receipt: ${swapReceipt}`);
  } catch (error) {
    console.log(error);
  }
};
swap();
