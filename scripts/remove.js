import { ethers, Wallet, Contract, BigNumber } from "ethers";
import dotenv from "dotenv";
import fs from "fs";
import { ABI } from "../abi/ABI.js";
import { BucketInfo } from "./constants.js";

dotenv.config();

//const url = "https://mainnet.infura.io/v3/a9b568dde13449ee807495d533f80761";
const url = "https://goerli.infura.io/v3/a9b568dde13449ee807495d533f80761";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const main = async () => {
  const rpc = new ethers.providers.JsonRpcProvider(url);
  const signer = new Wallet(process.env.PRIVATE_KEY, rpc);

  for (const bucket of BucketInfo) {
    console.log("Removing ", bucket.name, "data");
    const bucketContract = new Contract(bucket.address, ABI, signer);

    try {
      const exoprtedStr = fs.readFileSync(
        `./exported/${bucket.name}_backup.json`
      );
      const exportedData = JSON.parse(exoprtedStr);

      const removedStr = fs.readFileSync(`./removed/${bucket.name}.json`);
      const removedAddresses = JSON.parse(removedStr);

      let count = 0;
      for (const user of exportedData) {
        const index = removedAddresses.indexOf(user.userWallet);
        if (index >= 0) {
          continue;
        }

        const tx = await bucketContract.removeVesting(user.vestingId);
        await tx.wait();
        if (count > 0 && count % 10 == 0) {
          await sleep(20000);
        }
        await sleep(2000);

        removedAddresses.push(user.userWallet);

        fs.writeFileSync(
          `./removed/${bucket.name}.json`,
          JSON.stringify(removedAddresses, null, 2)
        );

        console.log("Removed vesting", user.vestingId);
        count++;
      }
    } catch (e) {
      console.log(e);
      return;
    }

    const vestingIdList = exportedData.map((item) => item.vestingId);

    console.log("vesting count:", vestingIdList.length);

    const wallets = bucket.userWallets.map((wallet) => wallet);
    while (wallets.length > 0) {
      try {
        const params = wallets.splice(0, 50);
        const tx = await bucketContract.removeWalletListFromVesting(params);
        await tx.wait();
        await sleep(2000);
      } catch (e) {
        console.log(e);
        return;
      }
    }
  }

  console.log("done");
};

main();
