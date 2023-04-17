import { utils, Wallet } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

export default async function (hre: HardhatRuntimeEnvironment) {
  // rich wallet from local-node (not real)
  const wallet = new Wallet(
    "0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110"
  );
  const deployer = new Deployer(hre, wallet);
  const factoryArtifact = await deployer.loadArtifact("SimpleFactory");
  const childArtifact = await deployer.loadArtifact("Child");
  const stepChildArtifact = await deployer.loadArtifact("StepChild");

  // Getting the bytecodeHash of the account
  const childBytecodeHash = utils.hashBytecode(childArtifact.bytecode);
  const stepchildBytecodeHash = utils.hashBytecode(stepChildArtifact.bytecode);

  const fee = await deployer.estimateDeployFee(factoryArtifact, [
    childBytecodeHash,
    stepchildBytecodeHash,
  ]);

  console.log(
    `Estimated fee is ${ethers.utils.formatEther(fee.toString())} ETH`
  );

  const factory = await deployer.deploy(
    factoryArtifact,
    // constructor args
    [childBytecodeHash, stepchildBytecodeHash],
    // tx overrides
    undefined,
    // additional factory deps
    [
      // Since the factory requires the code of the contracts to be available,
      // we should pass it here as well.
      childArtifact.bytecode,
      stepChildArtifact.bytecode,
    ]
  );

  console.log(`Factory address: ${factory.address}`);
}
