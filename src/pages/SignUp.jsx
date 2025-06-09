import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegCircleXmark } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { AuthContext } from "../context/auth/AuthContext"
import Loader from "../components/common/ui/Loader"
import { toast } from "react-toastify";

const SignUp = () => {
  
  const { createUser, updateUser, signInWithGoogle, setUser } =
    useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasEightCharacter, setHasEightCharacter] = useState(false);
  const [hasSpecialCharacter, setHasSpecialCharacter] = useState(false)
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Check password requirements
    setHasUpperCase(/[A-Z]/.test(newPassword));
    setHasLowerCase(/[a-z]/.test(newPassword));
    setHasSpecialCharacter(/[!@#$%^&*(),.?":{}|<>]/.test(newPassword))
    setHasEightCharacter(newPassword.length >= 8);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hasUpperCase || !hasLowerCase || !hasEightCharacter || !hasSpecialCharacter) {
      setPasswordError(true);
      return;
    }
    setIsLoading(true);
    setErrorMessage("");
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
            navigate("/");
            toast.success('Registration successful')
          })
          .catch((error) => setErrorMessage(error.message));
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setErrorMessage("This email is already registered.");
        } else {
          setErrorMessage(error.message);
        }
        setIsLoading(false);
      });
  };

  // sign in with google
  const handleSignInWithGoogle = () => {
    setErrorMessage("");
    signInWithGoogle()
      .then((result) => {
        setUser(result.user);
        toast.success('Login successful')
        navigate("/");
      })
      .catch((error) => setErrorMessage(error.message));
  };

  return (
    <div className="grow flex justify-center my-6 items-center w-11/12 mx-auto ">
      <div className="card  w-full max-w-sm shrink-0 shadow-2xl bg-amber-400">
        <div className="card-body">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-green-600">SignUp Now !</h1>
          <form className="fieldset" onSubmit={handleSubmit}>
            {/* name */}
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              className="input"
              placeholder="Enter Your Name"
              required
            />
            {/* photo url */}
            <label className="label">Photo URL</label>
            <input
              type="text"
              name="photo"
              className="input"
              placeholder="Enter Your Photo URL"
              required
            />
            {/* email */}
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
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
              className="input"
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
                    className={hasUpperCase ? "text-green-500" : "text-red-500"}
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
                    className={hasLowerCase ? "text-green-500" : "text-red-500"}
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
                      hasEightCharacter ? "text-green-500" : "text-red-500"
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
                      hasSpecialCharacter ? "text-green-500" : "text-red-500"
                    }
                  >
                    Passwords must contain a special character
                  </p>
                </div>
              </div>
            )}
            <button type="submit" className="btn bg-green-600 text-white font-bold tracking-widest mt-4">
              {isLoading ? <Loader /> : "SignUp"}
            </button>
            {errorMessage && (
              <p className="text-red-500 text-center mt-2">{errorMessage}</p>
            )}
            {/* social register */}
          </form>
          <div>
            <div className="flex items-center pt-4 space-x-1">
              <div className="flex-1 h-px w-full dark:bg-gray-300"></div>
              <span className="text-sm px-3 dark:text-gray-600">
                Register with social accounts
              </span>
              <div className="flex-1 h-px w-full dark:bg-gray-300"></div>
            </div>
            {/* google */}
            <div className="flex justify-center">
              {/* google */}
              <button
                onClick={handleSignInWithGoogle}
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
              Already have an account ?{" "}
              <Link className="text-blue-500" to={"/login"}>
                SignIn
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;