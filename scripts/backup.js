import { ethers, Wallet, Contract, BigNumber } from "ethers";
import dotenv from "dotenv";
import fs from "fs";
import { ABI } from "../abi/ABI.js";
import { BucketInfo } from "./constants.js";

dotenv.config();

const url = "https://mainnet.infura.io/v3/a9b568dde13449ee807495d533f80761";
//const url = "https://goerli.infura.io/v3/a9b568dde13449ee807495d533f80761";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const main = async () => {
  const rpc = new ethers.providers.JsonRpcProvider(url);
  const signer = new Wallet(process.env.PRIVATE_KEY, rpc);

  for (const bucket of BucketInfo) {
    console.log("Backup", bucket.name);
    const bucketContract = new Contract(bucket.address, ABI, signer);

    let result = [];

    try {
      const str = fs.readFileSync(`./exported/${bucket.name}_backup.json`);
      result = JSON.parse(str);
    } catch (e) {}

    const vestings = await bucketContract.vestingPropertiesList();

    let count = 0;
    for (const userWallet of bucket.userWallets) {
      if (result.findIndex((r) => r.userWallet === userWallet) >= 0) {
        continue;
      }

      const data = await bucketContract.userPropertiesList(userWallet);
      const vesting = vestings[data.vestingId.toNumber()];
      result.push({
        isActive: data.isActive,
        userWallet: userWallet,
        spentAmount: data.isActive ? data.spentAmount.toString() : "0",
        vestingAmount: data.isActive ? vesting.amountForUser.toString() : "0",
        vestingId: data.vestingId.toNumber(),
      });

      if (count > 0 && count % 10 == 0) {
        await sleep(5000);
      } else {
        await sleep(2000);
      }

      fs.writeFileSync(
        `./exported/${bucket.name}_backup.json`,
        JSON.stringify(result, null, 2)
      );

      console.log(userWallet);
      count++;
    }
  }

  console.log("done");
};

main();

// find duplicated addresses
//
// const a = BucketInfo[1].userWallets.find(
//   (u, index) => index !== BucketInfo[1].userWallets.findIndex((u2) => u === u2)
// );
//
// console.log(a);
