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
    const bucketContract = new Contract(bucket.address, ABI, signer);
    console.log("Removing ", bucket.name, "data");
    const exoprtedStr = fs.readFileSync(
      `./exported/${bucket.name}_backup.json`
    );
    const exportedData = JSON.parse(exoprtedStr);

    let removedAddresses = [];

    try {
      removedStr = fs.readFileSync(`./removed/${bucket.name}Vesting.json`);
      removedAddresses = JSON.parse(removedStr);
    } catch (e) {}

    let count = 0;
    for (const user of exportedData) {
      const index = removedAddresses.indexOf(user.userWallet);
      if (index >= 0) {
        continue;
      }

      try {
          const estimatedGas = await bucketContract.estimateGas.removeVesting(user.vestingId);
          const tx = await bucketContract.removeVesting(user.vestingId, { gasLimit: estimatedGas, });
        await tx.wait();
      } catch (e) {
        console.log(
          "Tx reverted. Wallet:",
          user.userWallet,
          ", vestingId:",
          user.vestingId
        );
        return;
      }

      if (count > 0 && count % 10 == 0) {
        await sleep(20000);
      }
      await sleep(2000);

      removedAddresses.push(user.userWallet);

      fs.writeFileSync(
        `./removed/${bucket.name}Vesting.json`,
        JSON.stringify(removedAddresses, null, 2)
      );

      console.log("Removed vesting", user.vestingId);
      count++;
    }
  }

  console.log("done");
};

main();
