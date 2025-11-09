# Security & Dependency Notes

## Known Dependency Issues

This document tracks known security vulnerabilities and deprecated packages in the project dependencies.

### Critical Issues

#### 1. Deprecated Metaplex SDK
**Package**: `@metaplex-foundation/js@0.20.1`
**Status**: Deprecated by maintainer
**Impact**: This package is no longer supported and has transitive dependencies with security vulnerabilities

**Recommended Action** When implementing Solana/NFT features:
- Migrate to `@metaplex-foundation/umi` and `@metaplex-foundation/umi-bundle-defaults`
- Use `@metaplex-foundation/mpl-token-metadata@^3` which is compatible with Umi
- Follow the [Metaplex Umi migration guide](https://developers.metaplex.com/umi)

**Migration Example**:
```typescript
// Old (deprecated)
import { Metaplex } from '@metaplex-foundation/js';

// New (recommended)
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';

const umi = createUmi('https://api.devnet.solana.com')
  .use(mplTokenMetadata());
```

### Transitive Vulnerabilities

The following vulnerabilities exist in transitive dependencies of deprecated packages:

#### axios <=0.30.1 (High Severity)
- GHSA-wf5p-g6vw-rhxx: Cross-Site Request Forgery Vulnerability
- GHSA-jr5f-v2jv-69x6: SSRF and Credential Leakage via Absolute URL
- GHSA-4hjh-wcwx-xvwj: DoS attack through lack of data size check

**Source**: Transitive dependency via `aptos` → `@irys/sdk` → `@metaplex-foundation/js`
**Status**: Will be resolved by removing `@metaplex-foundation/js`

#### bigint-buffer (High Severity)
- GHSA-3gc7-fjrx-p6mg: Buffer Overflow via toBigIntLE() Function

**Source**: Transitive dependency via `@solana/spl-token` → `@solana/buffer-layout-utils`
**Status**: Will be resolved by updating `@solana/spl-token` when newer versions become available

#### form-data 4.0.0-4.0.3 (Critical)
- GHSA-fjxv-7rqg-78g4: Uses unsafe random function for choosing boundary

**Source**: Transitive dependency via deprecated Metaplex packages
**Status**: Will be resolved by removing `@metaplex-foundation/js`

### Moderate Vulnerabilities

#### esbuild <=0.24.2
- GHSA-67mh-4wv8-2f99: Enables any website to send requests to development server

**Status**: ✅ **FIXED** - Updated to esbuild@^0.26.0

### Low Vulnerabilities

#### brace-expansion 2.0.0-2.0.1
- GHSA-v6h2-p8h4-qcjw: Regular Expression Denial of Service vulnerability

**Status**: ✅ **FIXED** - Automatically resolved by npm audit fix

## Development Recommendations

### Before Writing Code That Uses:

1. **Metaplex/NFT Features**
   - Do NOT use `@metaplex-foundation/js`
   - Install and use `@metaplex-foundation/umi` instead
   - Update package.json before implementing NFT features

2. **Solana Web3**
   - Current version (`@solana/web3.js@^1.98.4`) is stable
   - Monitor for security updates
   - Consider v2 when it reaches stable status

3. **SPL Token Operations**
   - Current version has known vulnerabilities in transitive dependencies
   - Consider wrapping operations with additional input validation
   - Monitor for updates to `@solana/spl-token`

## Security Best Practices

### Input Validation
Always validate and sanitize inputs, especially when dealing with:
- Wallet addresses
- Token amounts
- User-provided metadata
- RPC endpoints

### Rate Limiting
Implement rate limiting for:
- RPC calls to Solana
- API endpoints
- WebSocket connections
- Static file serving (especially for user-uploaded content)

**Recommended package**: `express-rate-limit`
```bash
npm install express-rate-limit
```
See PERFORMANCE.md for implementation examples.

### Authentication
When implementing wallet authentication:
- Use established libraries (e.g., Privy as planned)
- Verify message signatures properly
- Implement proper session management
- Use secure HTTP headers

### Environment Variables
Never commit:
- Private keys
- RPC API keys
- Database credentials
- Session secrets

### Dependency Management

1. **Regular Updates**
   ```bash
   npm outdated
   npm update
   ```

2. **Security Audits**
   ```bash
   npm audit
   npm audit fix
   ```

3. **Before Production**
   - Run full security audit
   - Test all critical paths
   - Review all third-party dependencies
   - Implement dependency scanning in CI/CD

## Monitoring & Response

### Continuous Monitoring
- Enable GitHub Dependabot alerts
- Subscribe to security advisories for key dependencies
- Regularly check [Solana Security Advisories](https://github.com/solana-labs/solana/security/advisories)

### Incident Response
If a security vulnerability is discovered:
1. Assess impact on the application
2. Check if a patch is available
3. Test the patch in development
4. Deploy to production ASAP
5. Document the incident and resolution

## Safe Development Order

To minimize exposure to known vulnerabilities:

1. ✅ Set up project structure and configuration
2. ✅ Optimize build configuration (Vite, TypeScript, Tailwind)
3. ✅ Implement UI components (no vulnerable dependencies)
4. ✅ Set up database with Drizzle ORM
5. ✅ Implement Express server and API routes
6. ⚠️ **Before Solana integration**: Update to Umi-based Metaplex SDK
7. ✅ Implement Solana/NFT features with updated dependencies
8. ✅ Add authentication and authorization
9. ✅ Final security audit and testing

## Status Summary

| Issue | Severity | Status | Action Required |
|-------|----------|---------|-----------------|
| brace-expansion ReDoS | Low | ✅ Fixed | None |
| esbuild dev server | Moderate | ✅ Fixed | None |
| Metaplex deprecated | High | ⚠️ Documented | Migrate before use |
| axios vulnerabilities | High | ⚠️ Transitive | Remove with Metaplex |
| bigint-buffer overflow | High | ⚠️ Transitive | Monitor for updates |
| form-data insecure random | Critical | ⚠️ Transitive | Remove with Metaplex |

## Next Steps

1. ✅ Document all known issues (this file)
2. ✅ Optimize build configuration for performance
3. ⚠️ When implementing NFT features: Migrate to Umi-based SDK
4. ⚠️ Continuous monitoring for dependency updates
5. ⚠️ Run security audit before production deployment
