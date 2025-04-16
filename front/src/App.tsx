import InfoPage from './Components/InfoPage';
import './styles/main.scss'

import { store } from './store/store';
import { Provider } from 'react-redux';



function App() {
  return (
    <Provider store={store}>
      <InfoPage />
    </Provider>
  );
}

export default App;
