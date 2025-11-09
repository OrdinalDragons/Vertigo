import { Route, Switch } from 'wouter';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Switch>
        <Route path="/">
          <HomePage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </div>
  );
}

function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-display font-bold mb-4">
        Welcome to Collectiblez
      </h1>
      <p className="text-lg text-muted-foreground">
        A premium Solana NFT raffle platform
      </p>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-display font-bold mb-4">
        About Collectiblez
      </h1>
      <p className="text-lg text-muted-foreground">
        Built with performance and security in mind
      </p>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-display font-bold mb-4">404</h1>
      <p className="text-lg text-muted-foreground">Page not found</p>
    </div>
  );
}

export default App;
