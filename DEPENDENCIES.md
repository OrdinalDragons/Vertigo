# Dependency Versions

This file tracks all dependency versions to ensure everything is up-to-date.

**Last Updated:** 2025-11-09

## JavaScript/TypeScript Dependencies

### Solana & Blockchain (✅ All Latest)

| Package | Current Version | Latest Version | Status |
|---------|----------------|----------------|--------|
| @solana/web3.js | 1.98.4 | 1.98.4 | ✅ Latest |
| @solana/spl-token | 0.4.14 | 0.4.14 | ✅ Latest |
| @metaplex-foundation/mpl-core | 1.7.0 | 1.7.0 | ✅ Latest |
| @metaplex-foundation/mpl-token-metadata | 3.4.0 | 3.4.0 | ✅ Latest |
| @metaplex-foundation/umi | 1.4.1 | 1.4.1 | ✅ Latest |
| @metaplex-foundation/umi-bundle-defaults | 1.4.1 | 1.4.1 | ✅ Latest |

### Known Issues
- **bigint-buffer** vulnerability in @solana/spl-token (3 high severity)
- Status: Upstream issue, monitoring for Solana ecosystem fix
- Mitigation: Using latest versions, input validation documented

## Rust/Anchor Dependencies (Requires Installation)

### Toolchain Versions

| Tool | Required Version | Installation Status |
|------|-----------------|---------------------|
| Rust | 1.75.0+ | ⚠️ Not installed |
| Cargo | 1.75.0+ | ⚠️ Not installed |
| Solana CLI | 1.18.x+ | ⚠️ Not installed |
| Anchor Framework | 0.30.1+ | ⚠️ Not installed |

### Anchor Program Dependencies

From `programs/raffle/Cargo.toml`:
```toml
[dependencies]
anchor-lang = "0.30.1"
anchor-spl = "0.30.1"

[dev-dependencies]
solana-program-test = "~1.18.0"
solana-sdk = "~1.18.0"
```

## Build Tools

| Tool | Version | Status |
|------|---------|--------|
| Node.js | 18+ | ✅ Installed |
| npm | 9+ | ✅ Installed |
| TypeScript | 5.6.3 | ✅ Installed |
| Vite | 5.4.20 | ✅ Installed |
| esbuild | 0.26.0 | ✅ Installed |

## Installation Instructions

### JavaScript/TypeScript (Ready)
```bash
npm install  # All packages already installed at latest versions
```

### Rust/Anchor (Setup Required)
See [SOLANA_SETUP.md](SOLANA_SETUP.md) for complete installation guide:

1. **Install Rust:**
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup target add bpfel-unknown-unknown
```

2. **Install Solana CLI:**
```bash
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"
```

3. **Install Anchor:**
```bash
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
avm install latest
avm use latest
```

## Version Check Commands

Run these to verify installations:

```bash
# JavaScript/TypeScript
node --version          # Should be 18+
npm --version           # Should be 9+
npm list @solana/web3.js @solana/spl-token @metaplex-foundation/mpl-core

# Rust/Anchor (after installation)
rustc --version         # Should be 1.75.0+
cargo --version         # Should be 1.75.0+
solana --version        # Should be 1.18.x+
anchor --version        # Should be 0.30.1+
```

## Update Strategy

### JavaScript/TypeScript
```bash
# Check for updates
npm outdated

# Update specific package
npm update <package-name>

# Update all packages (test first!)
npm update
```

### Rust/Anchor
```bash
# Update Rust
rustup update

# Update Solana CLI
solana-install update

# Update Anchor
avm install latest
avm use latest
```

## Security Monitoring

- Run `npm audit` monthly
- Check for Solana security advisories: https://github.com/solana-labs/solana/security/advisories
- Monitor Metaplex updates: https://developers.metaplex.com/
- Subscribe to Anchor releases: https://github.com/coral-xyz/anchor/releases

## Resources

- **Solana Docs**: https://solana.com/docs/intro/installation
- **Solana CLI**: https://docs.anza.xyz/cli/install
- **Anchor Book**: https://book.anchor-lang.com/
- **Metaplex Core**: https://developers.metaplex.com/core
- **NPM Registry**: https://www.npmjs.com/
- **Crates.io** (Rust): https://crates.io/
