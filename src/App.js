import './App.css';
import Body from './components/Body';
import Header from './components/Header';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';

function App() {
  return (
    <Provider store={appStore}>
      <div className='h-screen flex flex-col'>
        <Header />
        <Body />
      </div>
    </Provider>
  );
}

export default App;
