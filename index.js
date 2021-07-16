require("dotenv").config();
const { ethers } = require("ethers");
const { Token } = require("@uniswap/sdk-core");
const { Pool } = require("@uniswap/v3-sdk");

const maninnetProvider = process.env.MAINNET;
const provider = new ethers.providers.JsonRpcProvider(maninnetProvider);

