## Debug factory

- Install dependencies with `yarn`
- Compile contracts with `yarn harhdat compile`
- Start local setup node in a separate terminal
- Run deployment script with `yarn hardhat deploy-zksync --script deploy.ts`
- Copy the factory address and enter it in the `use-fac.ts` file.
- Run script with `yarn hardhat deploy-zksync --script use-fac.ts`. It deploys new contracts via the factory with systemContractCaller and via `new`. Prints in console the amount of deployed contracts and addresses.


## Deploy with isSystem

Estimated fee is 0.00043091925 ETH
Factory address: 0x4B5DF730c2e6b28E17013A1485E5d9BC41Efe021

Calling newStepChild()

  reason: 'cannot estimate gas; transaction may fail or may require manual gas limit',
  code: 'UNPREDICTABLE_GAS_LIMIT',

Calling createStepChild()

 reason: 'cannot estimate gas; transaction may fail or may require manual gas limit',
  code: 'UNPREDICTABLE_GAS_LIMIT',


## zkSync Hardhat project

This project was scaffolded with [zksync-cli](https://github.com/matter-labs/zksync-cli).

## Project structure

- `/contracts`: smart contracts.
- `/deploy`: deployment and contract interaction scripts.
- `/test`: test files
- `hardhat.config.ts`: configuration file.

## Commands

- `yarn hardhat compile` will compile the contracts.
- `yarn run deploy` will execute the deployment script `/deploy/deploy-greeter.ts`. Requires [environment variable setup](#environment-variables).
- `yarn run greet` will execute the script `/deploy/use-greeter.ts` which interacts with the Greeter contract deployed.
- `yarn test`: run tests. **Check test requirements below.**

Both `yarn run deploy` and `yarn run greet` are configured in the `package.json` file and run `yarn hardhat deploy-zksync`.

### Environment variables

In order to prevent users to leak private keys, this project includes the `dotenv` package which is used to load environment variables. It's used to load the wallet private key, required to run the deploy script.

To use it, rename `.env.example` to `.env` and enter your private key.

```
WALLET_PRIVATE_KEY=123cde574ccff....
```

### Local testing

In order to run test, you need to start the zkSync local environment. Please check [this section of the docs](https://v2-docs.zksync.io/api/hardhat/testing.html#prerequisites) which contains all the details.

If you do not start the zkSync local environment, the tests will fail with error `Error: could not detect network (event="noNetwork", code=NETWORK_ERROR, version=providers/5.7.2)`

## Official Links

- [Website](https://zksync.io/)
- [Documentation](https://v2-docs.zksync.io/dev/)
- [GitHub](https://github.com/matter-labs)
- [Twitter](https://twitter.com/zksync)
- [Discord](https://discord.gg/nMaPGrDDwk)
