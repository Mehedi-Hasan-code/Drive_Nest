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
      <div className="card bg-base rounded-2xl w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-3xl sm:text-4xl font-bold text-center  text-anti-base">
            LogIn
          </h1>
          <form onSubmit={handleSubmit} className="fieldset text-anti-base">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input border"
              placeholder="Email"
              required
            />
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input border"
              placeholder="Password"
              required
            />
            <div onClick={handleForgetPassword}>
              <a className="link link-hover">Forgot password?</a>
            </div>
            {errorMessage && (
              <p className="text-red-500 text-center mt-2">{errorMessage}</p>
            )}
            <button className="btn bg-btn-bg text-base rounded-2xl font-bold tracking-widest mt-4">
              {loading ? <Loader /> : 'SingIn'}
            </button>
          </form>

          {/* social login */}

          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px w-full"></div>
            <span className="text-sm px-3 text-anti-base">Login with social accounts</span>
            <div className="flex-1 h-px w-full"></div>
          </div>
          <div className="flex justify-center">
            {/* google */}
            <button
              onClick={handleLoginWithGoogle}
              className="btn bg-btn-bg border-none rounded-2xl text-base border-[#e5e5e5]"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>
          </div>
          <p className="my-2 text-center text-anti-base">
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
