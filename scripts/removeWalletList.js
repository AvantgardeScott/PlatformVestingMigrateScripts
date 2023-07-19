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
    console.log("RemoveWalletListFromVesting ...");

    const exoprtedStr = fs.readFileSync(
      `./exported/${bucket.name}_backup.json`
    );
    const exportedData = JSON.parse(exoprtedStr);

    let removedAddresses = [];
    try {
      const removedStr = fs.readFileSync(
        `./removed/${bucket.name}WalletList.json`
      );
      removedAddresses = JSON.parse(removedStr);
    } catch (e) {}

    const wallets = exportedData
      .filter((user) => user.isActive)
      .map((wallet) => wallet.userWallet);

    while (wallets.length > 0) {
      const params = wallets.splice(0, 10);
      try {
          const estimatedGas = await bucketContract.estimateGas.removeWalletListFromVesting(params);
          const tx = await bucketContract.removeWalletListFromVesting(params, { gasLimit: estimatedGas, });
        await tx.wait();
      } catch (e) {
        console.log("Tx reverted - addresses:", params);
        return;
      }

      await sleep(2000);

      removedAddresses = [...removedAddresses, ...params];

      fs.writeFileSync(
        `./removed/${bucket.name}WalletList.json`,
        JSON.stringify(removedAddresses, null, 2)
      );
    }
  }

  console.log("done");
};

main();
