# Sample Contracts

Sample smart contracts for local development and testing.

## Overview

- **ERC20Factory.sol**: Factory contract for deploying ERC20 tokens
- **SimpleERC20**: Basic ERC20 token implementation with mint/burn capabilities

## Quick Start

### 1. Install Foundry

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Start Local Blockchain

Start the local development blockchain:

```bash
bun devnet.ts
```

This starts a **Hardhat** node with:
- Chain ID: 31337
- RPC URL: http://localhost:8545
- Block time: 1 second

Keep this running in a separate terminal.

### 4. Deploy Contracts

In another terminal, deploy the contracts:

```bash
# Local development (uses default anvil RPC and test private key)
bun run deploy

# Deploy to testnet
CHAIN_RPC=https://sepolia.infura.io/v3/KEY PRIVATE_KEY=0x... bun run deploy
```

The deployed contract address is written to `deployed.txt`.

## Scripts

| Script | Description |
|--------|-------------|
| `bun devnet.ts` | Start local Hardhat node |
| `bun run deploy` | Build and deploy contracts |
| `forge build` | Compile contracts |
| `forge test` | Run contract tests |
| `forge clean` | Clean build artifacts |

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `CHAIN_RPC` | RPC endpoint URL | `http://127.0.0.1:8545` |
| `PRIVATE_KEY` | Deployer private key | First anvil test account |

## Contract Details

### ERC20Factory

- Deploys new ERC20 tokens with custom name, symbol, and decimals
- Tracks all deployed tokens with sequential indexing
- Emits events for new token deployments
- Creator becomes the owner of deployed tokens

### SimpleERC20

- Standard ERC20 implementation using OpenZeppelin
- Includes mint/burn functionality for token owner
- Configurable decimals
- Initial supply minted to creator on deployment

## License

MIT
