import { ethers, Wallet, Contract, BigNumber } from "ethers";
import dotenv from "dotenv";
import { ABI } from "../abi/ABI.js";
import { InsertData } from "./constants.js";

dotenv.config();

const TGE_PERCENTAGE = 1;
const START_TIME = 1689768000; // 2023-07-19 12:00:00 UTC
const TICK_COUNT = 19 * 30; // 19 months á 30 days
const TICK_DURATION = 24 * 60 * 60; // 24h of 60min of 60sec;

const bucketAddress = "0x346b1a0dbd69bf94a4f411bbf9795ec6aa526c73";
const OFFSET = 0;
//const url = "https://mainnet.infura.io/v3/a9b568dde13449ee807495d533f80761";
const url = "https://goerli.infura.io/v3/a9b568dde13449ee807495d533f80761";

// let users: userData[];

// type userData = {
//     address: string,
//     amount: number
// };

// type vestingSetup = {
//     amountForUser: BigNumber,
//     tgeAmountForUser: BigNumber,
//     startTime: number
//     tickCount: number,
//     tickDuration: number,
//     unallocatedAmount: BigNumber
//     active: boolean
// }

async function main() {
  const rpc = new ethers.providers.JsonRpcProvider(url);
  const signer = new Wallet(process.env.PRIVATE_KEY, rpc);

  const newBucketContract = new Contract(bucketAddress, ABI, signer);

  // create batch of users to add in correct format.
  const batch = [];
  const userAddresses = [];
  const vestingIDs = [];

  for (let user of InsertData) {
    let fullTokens = Math.trunc(user.amount * 100);
    let total_amount = BigNumber.from(fullTokens).mul(
      BigNumber.from(10).pow(16)
    );

    batch.push({
      amountForUser: total_amount,
      tgeAmountForUser: total_amount.mul(TGE_PERCENTAGE).div(100),
      startTime: START_TIME,
      tickCount: TICK_COUNT,
      tickDuration: TICK_DURATION,
      unallocatedAmount: total_amount,
      active: true,
    });
    userAddresses.push(user.address);
    vestingIDs.push(vestingIDs.length + OFFSET);
  }

  console.log(batch, userAddresses);
  let tx = await newBucketContract.insertVestingList(batch);
  console.log("pool: schedule created");
  await tx.wait();

  tx = await newBucketContract.insertWalletListToVesting(
    vestingIDs,
    userAddresses
  );
  console.log("pool: user added");
  await tx.wait();
  console.log("done");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
