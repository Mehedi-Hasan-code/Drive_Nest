import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext';
import Loader from '../components/common/ui/Loader';
import { toast } from 'react-toastify';

const SignIn = () => {
  const { signInByEmailAndPassword, signInWithGoogle, setUser } =
    useContext(AuthContext);
  const [loading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { state } = useLocation();
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInByEmailAndPassword(email, password)
      .then(() => {
        setIsLoading(false);
        navigate(state || '/');
        toast.success('Login successful');
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.message === 'Firebase: Error (auth/invalid-credential).') {
          setErrorMessage('Email or Password is wrong');
        } else {
          setErrorMessage(err.message);
        }
      })
      .finally(setIsLoading(false));
  };

  const handleLoginWithGoogle = () => {
    setErrorMessage('');
    signInWithGoogle()
      .then((result) => {
        setUser(result.user);
        navigate(state || '/');
        toast.success('Login successful');
      })
      .catch((error) => setErrorMessage(error.message));
  };
  // Forget Password
  const handleForgetPassword = () => {
    const email = document.querySelector('input[name="email"]').value;
    navigate('/forgetPassword', { state: { email } });
  };

  return (
    <div className="my-10 grow flex justify-center items-center mx-4">
      <div className="card bg-amber-200 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-3xl sm:text-4xl font-bold text-center  text-green-600">
            LogIn
          </h1>
          <form onSubmit={handleSubmit} className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
              required
            />
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
              required
            />
            <div onClick={handleForgetPassword}>
              <a className="link link-hover">Forgot password?</a>
            </div>
            {errorMessage && (
              <p className="text-red-500 text-center mt-2">{errorMessage}</p>
            )}
            <button className="btn bg-green-600 text-white font-bold tracking-widest mt-4">
              {loading ? <Loader /> : 'SingIn'}
            </button>
          </form>

          {/* social login */}

          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px w-full dark:bg-gray-300"></div>
            <span className="text-sm px-3 dark:text-gray-600">
              Login with social accounts
            </span>
            <div className="flex-1 h-px w-full dark:bg-gray-300"></div>
          </div>
          <div className="flex justify-center">
            {/* google */}
            <button
              onClick={handleLoginWithGoogle}
              aria-label="Log in with Google"
              className="p-3 cursor-pointer hover:bg-gray-200 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 fill-current"
              >
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
            </button>
          </div>
          <p className="my-2 text-center">
            Don't have an account ?{' '}
            <Link className="text-blue-500" to={'/signup'}>
              SignUp
            </Link>{' '}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
