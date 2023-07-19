import { ethers } from "hardhat";
import {PlatformVesting} from "../../../typechain";
import * as fs from "fs";
import {sleep} from "@nomicfoundation/hardhat-verify/dist/src/utilities";


async function main() {
    const seedAddress = "0xC780e9c48752cEbe21fb119E1A4EFEa57E4b0026";
    const [deployer] = await ethers.getSigners();
    let seed: PlatformVesting;

    seed = await (await ethers.getContractFactory("PlatformVesting")).attach(seedAddress);

    let outputs = [];

    let count = 0;
    for(let wallet of wallets) {
        console.log(wallet);
        let data = await seed.userPropertiesList(wallet);
        outputs.push({wallet: wallet, data: data})

        if(count > 0 && count % 10 == 0) {
            console.log("wait...")
            await sleep(20000);
        }
        await sleep(2000);
        count++;
    }

    let vestings = await seed.vestingPropertiesList();
    let s = "";

    for(let output of outputs)  {
        let vesting = vestings[output.data.vestingId.toNumber()];
        s += (output.data.isActive)
            ? ("true," + output.wallet + "," + output.data.spentAmount + "," + vesting.amountForUser + "\n")
            : ("false," + output.wallet + ",0,0\n");
    }

    fs.writeFileSync('./seed_backup.csv', s);

    console.log("done");
}

const wallets = [
    "0x5addf20d905791bfb2654509c736bcab61d36fe6",
    "0x04888a4335008A237B715e6794e04bbDA552A0c9",
    "0x8b3bf8f8daed778c32eb4fc8322c1ccfa9a19db7",
    "0x6b0267bf480ac1061b234801a2319c0fac751c15",
    "0x15eb00f65aae227373c6445c83050b71661171da",
    "0x504Da65490D964dF6Df0749F2fe4029fcED76A03",
    "0x1b72db473abeec41bb4679645bedff476828aef4",
    "0xe692b7473f3ad3e0a03192e238cb9d68ef9024c4",
    "0x386a150c2afd61b3a81395df6d5b3e6e47e82fe5",
    "0xbe50a2c3f2ebfbad6dd18e579fa94823ff45aaa1",
    "0xe87a121de268406c224a0a4e1cca4c23fee89270",
    "0xa2f8ae5af7bd75d54ed172b3b9e557d104d3913c",
    "0x5803c71347ED5E0C17Bd92eBccE229B363FCE385",
    "0x49DA8C914ba8267f9690eeEeF17BE07A9B6e83a2",
    "0x21f6f530f8DaD588459A1E9eD2eCE8CbDc1111E8",
    "0xe7874F3CeD9313Aa9b660bf1793537C887d92805",
    "0xAD25522FF477fEB7E9D48010430FC486Fbd11B0F",
    "0xb815A16FE92CABc49779ab10F81FCA390C9828a4",
    "0x274c6EC66D9906D377FdBf2E11396f280e9994EC",
    "0x33d32b08153d4c7a76b086f610a79f5ca0285f6c",
    "0x29f8e8F48d8dCCEA49a4b5adc6cB4De7c2aD5788",
    "0x4FA6FF7967F79fB1BD05E698A2dC5fb5534670d0",
    "0x9b8b64FEc0e26746067bD84c75483D82e167b1ae",
    "0x7C55c939Bc3349db35713aa2BB91a375F6462672",
    "0xB2A61E63DeF95405fb8A38639C28E710b75E0db4",
    "0xDEF49429BEdDAd604ac395807AfC59C41911c6E2",
    "0x8f5855908E4725FA97113A7A4aB747b44d6ea55a",
    "0x01b6adA807b3CF0483B63a30060022B154e9853e",
    "0x063216decF747b8F27Aa5d2CE7d3e0c03aE029C1",
    "0x2a773923024d19031f45d159d79b98b0a4873110",
    "0xce58D79C8b4B03323345d597541d139deed2D00B",
    "0xAc9e51136211c6eEDe736E4A2ebd79b2DBff0084",
    "0x1c4c7083b86a14e95c7722cd240b36854b3237a3",
    "0x89cbac1166dc3d256839af3d3a4adad8421448ea",
    "0x50072651CAFE19F7C88B372B66C5B490bCd775B1",
    "0xeA8c2F759060aBE281Fa8A6EA0b1f285d748D2e5",
    "0x0E29bf2c65e8634F55cF44497DC2dc20062b1Bc0",
    "0xc2150d6142AC9995fFa66C87108B72Cb39A053c2",
    "0x717a72c3bdeca933e1c83Ce8d70B06d4a0041D96",
    "0x2053EE81AC4235D64ca6DD635D7cA1AD06C995eB",
    "0xfF7aDCd2b5296d8DE9E965831369b22E7Db9E325",
    "0x73296d6f8dd7d437887e5a1072c8081e406ed0b2",
    "0x9ADaC53fa7Fa5FF6dE80247Db35b5bBeceAcc89F",
    "0xEF64C74980BEEF939c12018A70D9D6D67cbe7b6a",
    "0xc167d7df4e4b05d01198780a4f1f6bc844b21037",
    "0xee1d8685f9ba5f5d0ddeac649ab4c0d7f08de141",
    "0x79E1411caA2629C0d08cd208E02691F5299908De",
    "0xf9fe5C9d6696c926eea1f67aC2D6FEe2368C2FA2",
    "0x52AbF73922baB2722653E333E49Dcbce44cf1327",
    "0x74e9f7413ff96Db7903ccF38f5bf4144a473c477",
    "0x8E4B656B35A0fb5F7F8F4568Bce2a5F6cB6c8b92",
    "0xEcf9bf4d2c43Ea3a2Bb7582B9251a65d2CA6bD7D",
    "0xdcEb8Ad800eBb06087033076a56299F11216E544",
    "0x96BAaFAb684DB90740dbD7d65dc247c73CBFF1dB",
    "0x5Bd27B915E6A567C3a4a8B24001C3B3D5a164545",
    "0xF30e5119cFfaaD132d5F858011D929e6bBFcAB74",
    "0x0a0338f5795aaF9b85255D96a7Da86BEd1682C4F",
    "0x92e611A71199b277416C64a4723D39E1c35DbbBE",
    "0x788b165152a71ec97877DdB7632004A85E449925",
    "0xF72A92445FAeDDDbedBA08d46977b3B942D1E1aB",
    "0xb1F91caA6a87DCDF2E57E61F558361E99D79845c",
    "0x98fE7AAD45263FbE56bbC7592e90a7cF7F5De5de",
    "0x498a156fEc45E04Cb08D1cd79d782Df4ae2faD17",
    "0xdB243c8A2cD3C15d77D7c918ef4f1eD549D0feFE",
    "0x45Eb64F697b73bAfde0c141674fC25c2Ad7F250f",
    "0xfC9774386E2995aCC01A7dE9aa576C1FFb3f60D9",
    "0x8d1E6A826F6d2CcE3CF0DbAd56669c719D7972F8",
    "0x15DCfe332000fb526Ff4a1faDFd644e45eC83F13",
    "0xddCAFc71C69BF16F119EC8ff2f92AE9D00161A66",
    "0x062976F5ec455685535505E59dB5C89b5C1cdD3E",
    "0xa288f7b4dba752ad7ab227d2fd428bac234d5bf7",
    "0x87c6a4ebf7f12434fa023942e0e4ca3cef94342a",
    "0x58FE7E0B273A3e9D12E2c89b3D0EbF5162d7D90A",
    "0xd4a1451124438CA93a92D43d922e33CbBB7ab1B3",
    "0x69590536b6d3D2911BB4B32485eaeD0c392b4419",
    "0x818c22927312810A8FE92E0047863eDF71D3b569",
    "0xe8e624851ee202340Ee15d7D192D24c424543Abf",
    "0x43A3A594660CC291FEAe4c859f2A1B630A403C75",
    "0x419c25022B18e3B2b708c934d85745d7361d29fF",
    "0x51fB7dcB26c026B1782D2dFfd3bbd6Ca0dF20306",
    "0xAA078C1cD29deE9eaAa2469048cEdF2696cE20b9",
    "0xeFF19F3d00Cc89477e59C8846Adbd84849C77EcD",
    "0x0759e699f09aeAC17c849f0Da39f34023f829D2A",
    "0x36a89970Cbfe8a1a41371975e77B4789Df4c8c63",
    "0x128f55FBDDCEdaB71049BD048cC61ea4fa554749",
    "0xF7Aa1B5A09dc3A4e26F8F1Ca09D6A68A04FD33a6",
    "0xdb6b6ba6a740ccafda3b60b823bada8091b9027b",
    "0x3b47d483cECc59d15B1d6c5440A19D60DaEa7FA6",
];

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
