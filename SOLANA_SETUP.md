# Solana Development Setup Guide

This guide walks you through setting up all required tools for Solana development with Rust, Anchor, and Metaplex.

## Prerequisites

- Linux, macOS, or WSL2 on Windows
- Node.js 18+ (already installed)
- Git

## 1. Install Rust and Cargo

### Using rustup (Recommended)

```bash
# Install rustup
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Follow the prompts, then reload your shell
source $HOME/.cargo/env

# Verify installation
rustc --version
cargo --version

# Install the latest stable Rust
rustup update stable
rustup default stable
```

### Expected Versions
- Rust: 1.75.0 or later (latest stable)
- Cargo: 1.75.0 or later (latest stable)

### Configure Rust for Solana

```bash
# Add the BPF target for Solana program compilation
rustup target add bpfel-unknown-unknown
```

## 2. Install Solana CLI

### Method 1: Download Prebuilt Binaries (Recommended)

**For Linux and macOS:**
```bash
# Install the latest stable version
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"

# Add to PATH (add this to your ~/.bashrc or ~/.zshrc)
export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"

# Reload your shell or source the file
source ~/.bashrc  # or source ~/.zshrc

# Verify installation
solana --version
```

**Expected version:** 1.18.x or later (latest stable)

### Method 2: Build from Source (Advanced)

```bash
# Clone the Solana repository
git clone https://github.com/solana-labs/solana.git
cd solana

# Checkout the latest stable tag
git checkout v1.18.0  # Replace with latest stable version

# Build and install
./scripts/cargo-install-all.sh .
export PATH=$PWD/bin:$PATH
```

### Solana CLI Configuration

```bash
# Set to devnet for development
solana config set --url https://api.devnet.solana.com

# Generate a new keypair (or use existing)
solana-keygen new --outfile ~/.config/solana/devnet.json

# Request airdrop for testing (devnet only)
solana airdrop 2

# Check balance
solana balance
```

## 3. Install Anchor Framework

Anchor is a framework for Solana programs that makes development easier.

### Prerequisites
- Rust installed
- Solana CLI installed
- Node.js 18+

### Install Anchor CLI

```bash
# Install Anchor using cargo
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force

# Use AVM to install the latest Anchor version
avm install latest
avm use latest

# Verify installation
anchor --version
```

**Expected version:** 0.30.0 or later

### Alternative: Install Specific Version

```bash
# Install a specific Anchor version
avm install 0.30.1
avm use 0.30.1
```

## 4. Metaplex Setup

### Metaplex Core SDK (JavaScript/TypeScript)

The latest Metaplex Core SDK is already included in package.json. To add it explicitly:

```bash
# Install Metaplex Core SDK
npm install @metaplex-foundation/mpl-core

# Install Metaplex UMI (Universal Module Interface)
npm install @metaplex-foundation/umi @metaplex-foundation/umi-bundle-defaults

# Install Token Metadata (if needed)
npm install @metaplex-foundation/mpl-token-metadata
```

### Metaplex Sugar (NFT Candy Machine CLI)

```bash
# Install Sugar CLI for Candy Machine management
bash <(curl -sSf https://sugar.metaplex.com/install.sh)

# Verify installation
sugar --version
```

### Metaplex Amman (Local Validator with Metaplex Programs)

```bash
# Install Amman globally
npm install -g @metaplex-foundation/amman

# Verify installation
amman --version
```

## 5. Project Structure for Anchor Program

Create the following structure for your Solana Anchor program:

```bash
# Create programs directory
mkdir -p programs/raffle

# Initialize Anchor project (if starting fresh)
# anchor init vertigo-raffle --test-template mocha
```

### Expected Directory Structure

```
Vertigo/
├── programs/                 # Solana programs (Rust)
│   └── raffle/
│       ├── Cargo.toml
│       ├── Xargo.toml
│       └── src/
│           └── lib.rs
├── tests/                    # Anchor tests
│   └── raffle.ts
├── migrations/              # Deployment scripts
│   └── deploy.ts
├── Anchor.toml              # Anchor configuration
├── client/                  # React frontend (existing)
├── server/                  # Express backend (existing)
└── package.json
```

## 6. Version Verification Checklist

Run these commands to verify all tools are installed correctly:

```bash
# Rust
rustc --version          # Should be 1.75.0+
cargo --version          # Should be 1.75.0+

# Solana
solana --version         # Should be 1.18.x+
solana config get        # Verify RPC URL

# Anchor
anchor --version         # Should be 0.30.0+

# Node.js packages (already installed)
node --version           # Should be 18+
npm --version            # Should be 9+

# Metaplex (optional)
sugar --version          # If installed
amman --version          # If installed
```

## 7. Anchor.toml Configuration

Create `Anchor.toml` in the project root:

```toml
[toolchain]
anchor_version = "0.30.1"

[features]
seeds = false
skip-lint = false

[programs.localnet]
raffle = "BYhrkv1yPFJrtyKbL5UBF2GvabQw3His9tF5AV2JgzRy"

[programs.devnet]
raffle = "BYhrkv1yPFJrtyKbL5UBF2GvabQw3His9tF5AV2JgzRy"

[programs.mainnet]
raffle = "BYhrkv1yPFJrtyKbL5UBF2GvabQw3His9tF5AV2JgzRy"

[registry]
url = "https://api.apr.dev"

[provider]
cluster = "Devnet"
wallet = "~/.config/solana/devnet.json"

[scripts]
test = "yarn run ts-mocha -p ./tsconfig.json -t 1000000 tests/**/*.ts"

[test]
startup_wait = 5000

[[test.validator.clone]]
address = "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"

[[test.validator.clone]]
address = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
```

## 8. Rust-Toolchain Configuration

Create `rust-toolchain.toml` in the project root:

```toml
[toolchain]
channel = "1.75.0"
components = ["rustfmt", "clippy"]
targets = ["bpfel-unknown-unknown"]
profile = "default"
```

## 9. Update package.json Scripts

Add Anchor-related scripts to your package.json:

```json
{
  "scripts": {
    "anchor:build": "anchor build",
    "anchor:test": "anchor test",
    "anchor:deploy": "anchor deploy",
    "anchor:localnet": "solana-test-validator",
    "anchor:clean": "anchor clean"
  }
}
```

## 10. Common Issues and Solutions

### Issue: Rust compilation errors
```bash
# Update Rust
rustup update

# Clean and rebuild
cargo clean
cargo build
```

### Issue: Solana CLI not in PATH
```bash
# Add to ~/.bashrc or ~/.zshrc
export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"
source ~/.bashrc
```

### Issue: Anchor build fails
```bash
# Ensure BPF target is installed
rustup target add bpfel-unknown-unknown

# Clean Anchor build
anchor clean
anchor build
```

### Issue: Out of SOL on devnet
```bash
# Request airdrop
solana airdrop 2

# Or get from faucet: https://faucet.solana.com/
```

## 11. Current Package Versions (JavaScript/TypeScript)

The following packages are **already installed and up-to-date**:

| Package | Current | Status |
|---------|---------|--------|
| `@solana/web3.js` | 1.98.4 | ✅ Latest stable |
| `@solana/spl-token` | 0.4.14 | ✅ Latest stable |
| `@metaplex-foundation/mpl-token-metadata` | 3.4.0 | ✅ Latest stable |

### Recommended Additions

For Metaplex Core (new standard), add:

```bash
npm install @metaplex-foundation/mpl-core@^1.7.0
npm install @metaplex-foundation/umi@^1.4.1
npm install @metaplex-foundation/umi-bundle-defaults@^1.4.1
```

**Note:** These packages are already installed in this project at the latest versions.

## 12. Development Workflow

### Starting Development

```bash
# 1. Start local validator
solana-test-validator

# 2. In another terminal, build and deploy
anchor build
anchor deploy

# 3. Run tests
anchor test --skip-local-validator

# 4. Start frontend
npm run dev
```

### Testing Workflow

```bash
# Run all tests
anchor test

# Run specific test file
anchor test --skip-build -- --grep "test-name"

# Run with logs
ANCHOR_LOG=true anchor test
```

## 13. Resources

### Official Documentation
- **Solana Docs**: https://solana.com/docs/intro/installation
- **Solana CLI**: https://docs.anza.xyz/cli/install
- **Anchor Book**: https://book.anchor-lang.com/
- **Metaplex Core**: https://developers.metaplex.com/core
- **Metaplex Docs**: https://developers.metaplex.com/

### Community Resources
- **Solana Cookbook**: https://solanacookbook.com/
- **Anchor Examples**: https://github.com/coral-xyz/anchor/tree/master/examples
- **Solana Program Library**: https://spl.solana.com/

### Tools
- **Solana Explorer (Devnet)**: https://explorer.solana.com/?cluster=devnet
- **Solana Faucet**: https://faucet.solana.com/
- **Metaplex Dashboard**: https://www.metaplex.com/

## 14. Next Steps

1. ✅ Install Rust and Cargo
2. ✅ Install Solana CLI and configure for devnet
3. ✅ Install Anchor Framework
4. ✅ Verify all installations
5. ⚠️ Create Anchor project structure
6. ⚠️ Implement raffle program in Rust
7. ⚠️ Write tests for the program
8. ⚠️ Deploy to devnet
9. ⚠️ Integrate with frontend

## Summary

Your JavaScript/TypeScript packages are already at the latest stable versions:
- ✅ **@solana/web3.js**: 1.98.4 (latest stable)
- ✅ **@solana/spl-token**: 0.4.14 (latest stable)
- ✅ **@metaplex-foundation/mpl-token-metadata**: 3.4.0 (latest)
- ✅ **@metaplex-foundation/mpl-core**: 1.7.0 (latest - new Metaplex standard)
- ✅ **@metaplex-foundation/umi**: 1.4.1 (latest)
- ✅ **@metaplex-foundation/umi-bundle-defaults**: 1.4.1 (latest)

**Anchor project structure has been created:**
- ✅ `Anchor.toml` configuration file
- ✅ `rust-toolchain.toml` for Rust version management
- ✅ `programs/raffle/` directory with skeleton Rust program
- ✅ `tests/` directory for Anchor tests
- ✅ npm scripts added for Anchor commands

**To complete the setup**, you need to:
1. Install Rust/Cargo toolchain (see Section 1)
2. Install Solana CLI (see Section 2)
3. Install Anchor Framework (see Section 3)
4. Implement the raffle program logic in `programs/raffle/src/lib.rs`
5. Write tests in `tests/raffle.ts`
6. Build and deploy using `npm run anchor:build` and `npm run anchor:deploy`

All installation commands and configurations are provided above. Follow the step-by-step guide to get your full Solana development environment ready.
