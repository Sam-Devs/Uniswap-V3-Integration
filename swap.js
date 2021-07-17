require("dotenv").config();
const ISwapRouterABI = require("@uniswap/v3-periphery/artifacts/contracts/interfaces/ISwapRouter.sol/ISwapRouter.json");
const { Trade, Route } = require("@uniswap/v3-sdk");

const signer = new ethers.Wallet.createRandom();
const account = signer.connect(provider);

const routerAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
const maninnetProvider = process.env.MAINNET;
const provider = new ethers.providers.JsonRpcProvider(maninnetProvider);
const routerContract = new ethers.Contract(
  routerAddress,
  ISwapRouterABI.abi,
  provider
);

const router = routerContract.connect(account);

const main = async () => {
  const route = new Route([pool], tokenAddresses.token0, tokenAddresses.token1);
  console.log(
    `1 USDC can be swapped for ${route.midPrice.toSignificant(6)} WETH`
  );
  console.log(
    `1 WETH can be swapped for ${route.midPrice.invert.toSignificant(9)} USDC`
  );
  const trade = new Trade.exactIn(route, amountIn);
  console.log(
    `The execution price of this trade is ${trade.executionPrice.toSignificant(
      6
    )} WETH for 1 USDC`
  );

  // const swapParams = {
    //     path: Buffer.from([tokenAddresses.token0, tokenAddresses.token1]),
    //     recipient: signer.address,
    //     deadline: deadline,
    //     amountIn: ethers.utils.parseUnits(amountIn.toExact(), 6),
    //     amountOutMinimum: 
    // }
    const swapTransaction = router.exactInput(swapParams, {value: value, gasPrice: 20e9})
};
main();
