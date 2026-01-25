#!/usr/bin/env bun

import { $ } from "bun"
import { writeFileSync } from "node:fs"
import { resolve } from "node:path"

const contractsDir = import.meta.dir

// Defaults for local anvil development (first anvil test account)
const rpcUrl = process.env.CHAIN_RPC ?? "http://127.0.0.1:8545"
const privateKey =
  process.env.PRIVATE_KEY ??
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"

console.log("🏗️  Building and deploying sample contracts...")

// Check if foundry is installed
try {
  await $`forge --version`
} catch (error) {
  console.error("❌ Foundry not found. Please install it first:")
  console.error("   curl -L https://foundry.paradigm.xyz | bash")
  console.error("   foundryup")
  process.exit(1)
}

// Build contracts
console.log("📦 Building contracts...")
try {
  process.chdir(contractsDir)
  await $`forge build`
  console.log("✅ Contracts built successfully")
} catch (error) {
  console.error("❌ Failed to build contracts:", error)
  process.exit(1)
}

console.log(`🚀 Deploying to ${rpcUrl}...`)

// Deploy contracts
try {
  const deployResult =
    await $`forge create src/ERC20Factory.sol:ERC20Factory --rpc-url ${rpcUrl} --private-key ${privateKey} --broadcast`

  // Extract deployed address from forge output
  const output = deployResult.stdout.toString()
  const addressMatch = output.match(/Deployed to: (0x[a-fA-F0-9]{40})/)

  if (!addressMatch) {
    console.error("❌ Could not extract deployed address from forge output")
    console.error("Forge output:", output)
    process.exit(1)
  }

  const deployedAddress = addressMatch[1]
  console.log(`✅ ERC20Factory deployed to: ${deployedAddress}`)

  // Write deployed address to deployed.txt
  const deployedPath = resolve(contractsDir, "deployed.txt")
  writeFileSync(deployedPath, deployedAddress + "\n")

  console.log("✅ Address written to deployed.txt")
  console.log("")
  console.log("🎉 Sample contracts deployed successfully!")
} catch (error) {
  console.error("❌ Failed to deploy contracts:", error)
  process.exit(1)
}
