import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

function App() {
  const initialValues = { username: "", email: "", password: "", confirmPassword: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required !";
    }
    if (!values.email) {
      errors.email = "Email is required !";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format !";
    }
    if (!values.password) {
      errors.password = "Password is required !";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters !";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters !";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required !";
    }
    else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Password Not Match";
    }
    return errors;
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log(formValues); do whatever you want with form values
      toast.success('Successfully Registered !', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setFormValues({ username: "", email: "", password: "", confirmPassword: "" })
    }
  }, [formErrors])

  const handleReset = () => {
    setFormValues({ username: "", email: "", password: "", confirmPassword: "" })
  }
  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-md-4 border px-4 py-4 col-10 formcontainer">
          <form onSubmit={handleSubmit}>
            <h4 className="py-3">Register Now</h4>
            <div className="ui divider"></div>
            <div className="ui form">
              <div className="field">
                <label>Username</label>
                <input
                  type="text" className="form-control"
                  name="username"
                  placeholder="Username"
                  value={formValues.username}
                  onChange={handleChange}
                />
              </div>
              <p className="text-danger" >{formErrors.username}</p>
              <div className="field">
                <label>Email</label>
                <input
                  type="text" className="form-control"
                  name="email"
                  placeholder="Email"
                  value={formValues.email}
                  onChange={handleChange}
                />
              </div>
              <p className="text-danger" >{formErrors.email}</p>
              <div className="field">
                <label>Password</label>
                <input
                  type="password" className="form-control"
                  name="password"
                  placeholder="Password"
                  value={formValues.password}
                  onChange={handleChange}
                />
              </div>
              <p className="text-danger" >{formErrors.password}</p>

              <div className="field">
                <label>Confirm Password</label>
                <input
                  type="password" className="form-control"
                  name="confirmPassword"
                  placeholder="Password"
                  value={formValues.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <p className="text-danger" >{formErrors.confirmPassword}</p>

              <button className="btnsubmit mt-3 shadow-none" type="submit">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;