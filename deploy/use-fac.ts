import { Provider } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

// load env file
import dotenv from "dotenv";
dotenv.config();

// load contract artifact. Make sure to compile first!
import * as ContractArtifact from "../artifacts-zk/contracts/Factory2.sol/Factory2.json";

const PRIVATE_KEY =
  process.env.WALLET_PRIVATE_KEY ||
  "0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110";
// "0xf12e28c0eb1ef4ff90478f6805b68d63737b7f33abfa091601140805da450d93";

if (!PRIVATE_KEY)
  throw "⛔️ Private key not detected! Add it to the .env file!";

// Address of the contract on zksync testnet
const CONTRACT_ADDRESS = "0xf2FcC18ED5072b48C0a076693eCa72fE840b3981";

if (!CONTRACT_ADDRESS) throw "⛔️ Contract address not provided";

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running script to interact with contract ${CONTRACT_ADDRESS}`);

  // Initialize the provider.
  // @ts-ignore
  const provider = new Provider(hre.userConfig.networks?.zkSyncLocal?.url);
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);

  // Initialise contract instance
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    ContractArtifact.abi,
    signer
  );

  console.log(
    "signer.getBalance() :>> ",
    (await signer.getBalance()).toString()
  );

  console.log(
    "Factory childrenAmount :>> ",
    (await contract.childrenAmount()).toString()
  );

  console.log(
    "Factory stepChildrenAmount :>> ",
    (await contract.stepChildrenAmount()).toString()
  );

  console.log("children created with NEW :>> ", await contract.getChildren());

  const tx = await contract.createChild(3);

  console.log(`Transaction to createChild is ${tx.hash}`);
  await tx.wait();

  const tx2 = await contract.createStepChild();

  console.log(`Transaction to createStepChild is ${tx2.hash}`);
  await tx2.wait();

  const tx3 = await contract.newChild(55);

  console.log(`Transaction to newChild is ${tx3.hash}`);
  await tx3.wait();

  console.log(
    "Factory childrenAmount :>> ",
    (await contract.childrenAmount()).toString()
  );

  console.log(
    "Factory stepChildrenAmount :>> ",
    (await contract.stepChildrenAmount()).toString()
  );

  console.log("children created with NEW :>> ", await contract.getChildren());
}
