import { signInWithPopup } from 'firebase/auth';
import './Login.scss';
import { Button } from '@mui/material';
import { auth, provider } from '../../firebase';

const Login = () => {
  const signIn = () => {
    signInWithPopup(auth, provider).catch((err) => {
      // console.log(err);
      alert(err.message);
    });
  };

  return (
    <div className="login">
      <div className="loginLogo">
        <img src="./discordIcon.png" alt="logo" />
      </div>
      <Button onClick={signIn}>ログイン</Button>
    </div>
  );
};

export default Login;
