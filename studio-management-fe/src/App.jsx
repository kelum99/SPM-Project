import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { RequestContextProvider } from './services/RequestContext';
import { UserContextProvider } from './services/UserContext';
import MainRoutes from './MainRoutes';

function App() {
  return (
    <RequestContextProvider baseURL={`http://localhost:4000/api/v1/`}>
      <UserContextProvider>
        <BrowserRouter>
          <MainRoutes />
        </BrowserRouter>
      </UserContextProvider>
    </RequestContextProvider>
  );
}

export default App;
