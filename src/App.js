import './App.css';
import Body from './components/Body';
import Header from './components/Header';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import MainContainer from './components/MainContainer';
import WatchPage from './components/WatchPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Broken from './components/common/Broken';

function App() {
  const appRouter = createBrowserRouter([{
    path: "/",
    element: (
      <>
        <Header />
        <Body />
      </>
    ),
    children: [
      {
        path: "/",
        element: <MainContainer />
      },
      {
        path: "/watch",
        element: <WatchPage />
      }
    ]
  }])
  return (
    <Provider store={appStore}>
      <div className='h-screen flex flex-col'>
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
}

export default App;
