import './App.scss';
import Sidebar from './components/sidebar/Sidebar';
import Chat from './components/chat/Chat';
import Login from './components/login/Login';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect } from 'react';
import { auth } from './firebase';
import { login, logout } from './features/userSlice';

import { ErrorBoundary } from 'react-error-boundary';
import { Fallback } from './utils/ErrorFallback';

function App() {
  const user = useAppSelector((state) => state.user.user);
  // console.log(user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    //AuthでのLoginを検知してuserのstateをRedux経由で変更する
    auth.onAuthStateChanged((loginUser) => {
      if (loginUser) {
        dispatch(
          login({
            uid: loginUser.uid,
            photo: loginUser.photoURL,
            email: loginUser.email,
            displayName: loginUser.displayName,
          })
        );
        console.log('Login');
      } else {
        dispatch(logout());
        console.log('Logout');
      }
    });
  }, [dispatch]);

  return (
    <div className="App">
      {user ? (
        <>
          <Sidebar />
          <Chat />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
