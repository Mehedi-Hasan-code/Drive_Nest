import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegCircleXmark } from 'react-icons/fa6';
import { FaCheckCircle } from 'react-icons/fa';
import { AuthContext } from '../context/auth/AuthContext';
import Loader from '../components/common/ui/Loader';
import { toast } from 'react-toastify';
import useDocumentTitle from '../hooks/useDocumentTitle';

const SignUp = () => {
  useDocumentTitle('SignUp')
  const { createUser, updateUser, signInWithGoogle, setUser } =
    useContext(AuthContext);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasEightCharacter, setHasEightCharacter] = useState(false);
  const [hasSpecialCharacter, setHasSpecialCharacter] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Check password requirements
    setHasUpperCase(/[A-Z]/.test(newPassword));
    setHasLowerCase(/[a-z]/.test(newPassword));
    setHasSpecialCharacter(/[!@#$%^&*(),.?":{}|<>]/.test(newPassword));
    setHasEightCharacter(newPassword.length >= 8);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !hasUpperCase ||
      !hasLowerCase ||
      !hasEightCharacter ||
      !hasSpecialCharacter
    ) {
      setPasswordError(true);
      return;
    }
    setIsLoading(true);
    setErrorMessage('');
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    createUser(email, password)
      .then((result) => {
        updateUser(name, photo)
          .then(() => {
            setUser({
              ...result.user,
              displayName: name,
              photoURL: photo,
            });
            setIsLoading(false);
            navigate('/');
            toast.success('Registration successful');
          })
          .catch((error) => setErrorMessage(error.message));
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          setErrorMessage('This email is already registered.');
        } else {
          setErrorMessage(error.message);
        }
        setIsLoading(false);
      });
  };

  // sign in with google
  const handleSignInWithGoogle = () => {
    setErrorMessage('');
    signInWithGoogle()
      .then((result) => {
        setUser(result.user);
        toast.success('Login successful');
        navigate('/');
      })
      .catch((error) => setErrorMessage(error.message));
  };

  return (
    <div className="flex justify-center my-6 items-center">
      <div className="card w-full max-w-sm shrink-0 shadow-2xl bg-base rounded-2xl">
        <div className="card-body">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-anti-base">
            SignUp Now !
          </h1>
          <form className="fieldset text-anti-base" onSubmit={handleSubmit}>
            {/* name */}
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              className="input border"
              placeholder="Enter Your Name"
              required
            />
            {/* photo url */}
            <label className="label">Photo URL</label>
            <input
              type="text"
              name="photo"
              className="input border"
              placeholder="Enter Your Photo URL"
              required
            />
            {/* email */}
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input border"
              placeholder="Enter Your Email"
              required
            />
            {/* password */}
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              onFocus={() => setPasswordError(true)}
              className="input border"
              placeholder="Enter Your Password"
              required
            />
            {/* password error */}
            {passwordError && (
              <div className="my-2">
                <div className="flex items-center gap-2">
                  {hasUpperCase ? (
                    <FaCheckCircle fill="green" />
                  ) : (
                    <FaRegCircleXmark fill="red" />
                  )}
                  <p
                    className={hasUpperCase ? 'text-green-500' : 'text-red-500'}
                  >
                    Password Must have a Uppercase letter
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {hasLowerCase ? (
                    <FaCheckCircle fill="green" />
                  ) : (
                    <FaRegCircleXmark fill="red" />
                  )}
                  <p
                    className={hasLowerCase ? 'text-green-500' : 'text-red-500'}
                  >
                    Password Must have a Lowercase letter
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {hasEightCharacter ? (
                    <FaCheckCircle fill="green" />
                  ) : (
                    <FaRegCircleXmark fill="red" />
                  )}
                  <p
                    className={
                      hasEightCharacter ? 'text-green-500' : 'text-red-500'
                    }
                  >
                    Passwords Length must be at least 8 characters
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {hasSpecialCharacter ? (
                    <FaCheckCircle fill="green" />
                  ) : (
                    <FaRegCircleXmark fill="red" />
                  )}
                  <p
                    className={
                      hasSpecialCharacter ? 'text-green-500' : 'text-red-500'
                    }
                  >
                    Passwords must contain a special character
                  </p>
                </div>
              </div>
            )}
            <button
              type="submit"
              className="btn bg-btn-bg border-none text-base rounded-2xl font-bold tracking-widest mt-4"
            >
              {isLoading ? <Loader /> : 'SignUp'}
            </button>
            {errorMessage && (
              <p className="text-red-500 text-center mt-2">{errorMessage}</p>
            )}
          </form>
            {/* social register */}
          <div>
            <div className="flex items-center pt-4 space-x-1">
              <div className="flex-1 h-px w-full dark:bg-gray-300"></div>
              <span className="text-sm px-3 text-anti-base mb-2">
                Register with social accounts
              </span>
              <div className="flex-1 h-px w-full dark:bg-gray-300"></div>
            </div>
            {/* social container */}
            <div className="flex justify-center">
              {/* google */}
              <button onClick={handleSignInWithGoogle} className="btn bg-btn-bg border-none rounded-2xl text-base border-[#e5e5e5]">
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
              Already have an account ?{' '}
              <Link className="text-blue-500" to={'/login'}>
                SignIn
              </Link>{' '}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
