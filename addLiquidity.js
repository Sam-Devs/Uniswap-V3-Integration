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

const poolAddress = "0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8";
const poolContract = new ethers.Contract(poolAddress, IUniswapV3PoolABI.abi , provider);

const positionManagerAddress = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";
const positionManagerContract = new ethers.Contract(positionManagerAddress, INonfungiblePositionManager.abi, provider);

const positionManager = positionManagerContract.connect(account);

// console.log(positionManager);
const tokenAddresses = {
    token0: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    token1: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    // poolAddress: "0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8"
}

const main = async () => {

    const pool = new Pool(
        token0,
        token1,
        poolFee,
        slot0[0],
        poolLiquidity,
        slot0[1],
        tickList
    )

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