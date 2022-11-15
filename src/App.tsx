import { QueryClient, QueryClientProvider } from 'react-query';
import Main from './components/pages/Main';

function App() {
  const queryClient = new QueryClient()
 
  return (
    <div>
      <QueryClientProvider client={queryClient}>
          <Main />
      </QueryClientProvider>
    </div>
  );
}

export default App;
