import { ethers } from "hardhat";
import {PlatformVesting} from "../../../typechain";
import * as fs from "fs";
import {sleep} from "@nomicfoundation/hardhat-verify/dist/src/utilities";


async function main() {
    const kolAddress = "0x4fc18B68960A6ED7eab07451f0d755D857FF329d";
    const [deployer] = await ethers.getSigners();
    let kol: PlatformVesting;

    kol = await (await ethers.getContractFactory("PlatformVesting")).attach(kolAddress);

    let outputs = [];

    let count = 0;
    for(let wallet of wallets) {
        console.log(wallet);
        let data = await kol.userPropertiesList(wallet);
        outputs.push({wallet: wallet, data: data})

        if(count > 0 && count % 10 == 0) {
            console.log("wait...")
            await sleep(20000);
        }
        await sleep(2000);
        count++;
    }

    let vestings = await kol.vestingPropertiesList();
    let s = "";

    for(let output of outputs)  {
        let vesting = vestings[output.data.vestingId.toNumber()];
        s += (output.data.isActive)
            ? ("true," + output.wallet + "," + output.data.spentAmount + "," + vesting.amountForUser + "\n")
            : ("false," + output.wallet + ",0,0\n");
    }

    fs.writeFileSync('./kol_backup.csv', s);

    console.log("done");
}

const wallets = [
    "0x7047c10cd4AEc003Daf7C2D52BE139A982a8B9F2",
    "0x8355942333c33440BfaFf2Fc523aAbCda83FD6F3"
];

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
