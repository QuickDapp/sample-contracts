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

In another terminal, build and deploy:

```bash
# Build contracts
forge build

# Deploy ERC20Factory
forge create src/ERC20Factory.sol:ERC20Factory \
  --rpc-url http://localhost:8545 \
  --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

The private key above is the first Hardhat test account (public, for local dev only).

## Scripts

| Script | Description |
|--------|-------------|
| `bun devnet.ts` | Start local Hardhat node |
| `forge build` | Compile contracts |
| `forge test` | Run contract tests |
| `forge clean` | Clean build artifacts |

## Deploying to Other Networks

```bash
# Set your RPC endpoint and private key
export RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
export PRIVATE_KEY=your_private_key

# Deploy
forge create src/ERC20Factory.sol:ERC20Factory \
  --rpc-url $RPC_URL \
  --private-key $PRIVATE_KEY \
  --broadcast
```

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
