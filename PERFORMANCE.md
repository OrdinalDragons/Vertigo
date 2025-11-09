# Performance Optimization Guide

This document outlines performance best practices and optimizations implemented in the Vertigo (Collectiblez) project.

## Build Performance Optimizations

### 1. Vite Configuration
- **Code Splitting**: Configured manual chunks for better caching
  - `vendor`: Core React libraries
  - `ui`: Radix UI components
  - `solana`: Blockchain-related libraries (lazy-loaded)
- **Minification**: Using esbuild for JS and lightningcss for CSS
- **Target**: ES2020 for optimal bundle size and browser support
- **Dependency Pre-bundling**: Common dependencies pre-bundled for faster dev server start

### 2. Package Management
- **Security**: All known vulnerabilities addressed
- **Modern SDK**: Migrated from deprecated `@metaplex-foundation/js` to `@metaplex-foundation/umi`
- **esbuild**: Updated to v0.26.0 to fix security vulnerabilities

### 3. Tailwind CSS
- **JIT Mode**: Just-in-time compilation enabled (default in v3)
- **Purging**: Configured to scan only necessary files
- **Content Paths**: Optimized to reduce scanning time

## Runtime Performance Best Practices

### React Component Optimization

1. **Code Splitting & Lazy Loading**
```typescript
// Lazy load heavy components
const RaffleDetail = lazy(() => import('./pages/RaffleDetail'));
const Marketplace = lazy(() => import('./pages/Marketplace'));

// Use Suspense with fallback
<Suspense fallback={<LoadingSpinner />}>
  <RaffleDetail />
</Suspense>
```

2. **Memoization**
```typescript
// Memoize expensive calculations
const expensiveValue = useMemo(() => computeExpensiveValue(data), [data]);

// Memoize callback functions
const handleSubmit = useCallback(() => {
  // handler logic
}, [dependency]);

// Memoize components
const MemoizedCard = memo(NFTCard);
```

3. **Virtual Scrolling for Long Lists**
```typescript
// Use react-window or react-virtualized for long NFT lists
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={nfts.length}
  itemSize={200}
  width="100%"
>
  {Row}
</FixedSizeList>
```

### Solana Integration Optimization

1. **Connection Pooling**
```typescript
// Reuse connection instances
const connection = new Connection(
  RPC_ENDPOINT,
  { commitment: 'confirmed', wsEndpoint: WS_ENDPOINT }
);
```

2. **Batch RPC Calls**
```typescript
// Instead of multiple individual calls
const [balance, tokenAccounts] = await Promise.all([
  connection.getBalance(publicKey),
  connection.getTokenAccountsByOwner(publicKey, { programId: TOKEN_PROGRAM_ID })
]);
```

3. **Cache Blockchain Data**
```typescript
// Use TanStack Query for caching
const { data: nftMetadata } = useQuery({
  queryKey: ['nft', mintAddress],
  queryFn: () => fetchNFTMetadata(mintAddress),
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
});
```

### Database Query Optimization

1. **Use Indexes**
```typescript
// In Drizzle schema
export const raffles = pgTable('raffles', {
  id: serial('id').primaryKey(),
  status: varchar('status', { length: 20 }),
  endTime: timestamp('end_time'),
}, (table) => ({
  statusIdx: index('status_idx').on(table.status),
  endTimeIdx: index('end_time_idx').on(table.endTime),
}));
```

2. **Select Only Needed Columns**
```typescript
// Instead of select()
const results = await db
  .select({
    id: raffles.id,
    title: raffles.title,
    endTime: raffles.endTime,
  })
  .from(raffles);
```

3. **Use Pagination**
```typescript
const results = await db
  .select()
  .from(raffles)
  .limit(20)
  .offset(page * 20);
```

### Image Optimization

1. **Lazy Loading Images**
```typescript
<img 
  src={nftImage} 
  loading="lazy"
  decoding="async"
  alt={nftName}
/>
```

2. **Use Appropriate Image Formats**
- WebP for better compression
- AVIF for even better compression (with fallbacks)
- Placeholder images with blur effect

3. **Responsive Images**
```typescript
<img
  srcSet={`
    ${smallImage} 300w,
    ${mediumImage} 600w,
    ${largeImage} 1200w
  `}
  sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
  src={mediumImage}
  alt={nftName}
/>
```

## Server-Side Performance

### Express Optimizations

1. **Compression Middleware**
```typescript
import compression from 'compression';
app.use(compression());
```

2. **Response Caching**
```typescript
// Cache static assets
app.use('/assets', express.static('public', {
  maxAge: '1y',
  immutable: true,
}));
```

3. **Rate Limiting**
```typescript
import rateLimit from 'express-rate-limit';

// General API rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply to API routes
app.use('/api/', apiLimiter);

// Stricter rate limiting for authentication endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // Only 5 requests per 15 minutes
  skipSuccessfulRequests: true,
});

app.use('/api/auth/', authLimiter);

// Rate limit for file serving (if needed)
const staticLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // 60 requests per minute
});

app.use(express.static('public', { 
  maxAge: '1y',
  immutable: true,
  // Add rate limiting if serving user-uploaded content
}));
```

4. **Connection Pooling for Database**
```typescript
// Drizzle with connection pool
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: DATABASE_URL,
  max: 20, // Maximum pool size
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const db = drizzle(pool);
```

### WebSocket Optimization

1. **Limit Broadcast Frequency**
```typescript
// Throttle updates
let updateTimeout: NodeJS.Timeout;
function broadcastUpdate(data: any) {
  clearTimeout(updateTimeout);
  updateTimeout = setTimeout(() => {
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }, 100); // Batch updates every 100ms
}
```

2. **Use Binary Protocol When Possible**
```typescript
// For large data transfers
const buffer = Buffer.from(JSON.stringify(data));
ws.send(buffer, { binary: true });
```

## Monitoring & Profiling

### Development Tools
1. **React DevTools Profiler**: Identify slow components
2. **Chrome DevTools Performance**: Analyze runtime performance
3. **Lighthouse**: Audit overall web performance
4. **Bundle Analyzer**: Check bundle size
```bash
npm install --save-dev rollup-plugin-visualizer
```

### Production Monitoring
1. **Web Vitals**: Track Core Web Vitals (LCP, FID, CLS)
2. **Error Tracking**: Implement error boundary and logging
3. **RPC Monitoring**: Track Solana RPC response times

## Performance Checklist

### Before Production
- [ ] Lazy load routes and heavy components
- [ ] Implement proper memoization for expensive operations
- [ ] Add virtual scrolling for long lists (>100 items)
- [ ] Optimize images (format, size, lazy loading)
- [ ] Minimize bundle size (check with analyzer)
- [ ] Enable gzip/brotli compression
- [ ] Implement proper caching strategies
- [ ] Add database indexes for frequently queried columns
- [ ] Test with throttled network (Slow 3G)
- [ ] Audit with Lighthouse (target score >90)

### Continuous Monitoring
- [ ] Track Core Web Vitals
- [ ] Monitor bundle size on each build
- [ ] Review slow queries in database
- [ ] Check for memory leaks in long-running sessions
- [ ] Monitor Solana RPC performance

## Common Anti-Patterns to Avoid

### ❌ Bad Practices
```typescript
// Don't create new objects in render
<Component style={{ margin: 10 }} /> // Creates new object every render

// Don't use index as key in dynamic lists
{items.map((item, index) => <Item key={index} />)}

// Don't call hooks conditionally
if (condition) {
  useEffect(() => {}, []); // ❌
}

// Don't fetch data in render
function Component() {
  const data = fetchData(); // ❌ Causes re-renders
  return <div>{data}</div>;
}
```

### ✅ Good Practices
```typescript
// Define styles outside component
const styles = { margin: 10 };
<Component style={styles} />

// Use stable unique IDs as keys
{items.map(item => <Item key={item.id} />)}

// Always call hooks at top level
useEffect(() => {
  if (condition) {
    // logic here
  }
}, [condition]);

// Use proper data fetching patterns
function Component() {
  const { data } = useQuery('key', fetchData);
  return <div>{data}</div>;
}
```

## Resources
- [React Performance Optimization](https://react.dev/learn/render-and-commit)
- [Vite Performance](https://vitejs.dev/guide/performance.html)
- [Web Vitals](https://web.dev/vitals/)
- [Solana Cookbook](https://solanacookbook.com/)
