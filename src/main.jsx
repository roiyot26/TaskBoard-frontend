import { createRoot } from 'react-dom/client'
import { App } from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux'
import { store } from './store/store'


const queryClient = new QueryClient();
import './services/i18n.service'

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>
)
