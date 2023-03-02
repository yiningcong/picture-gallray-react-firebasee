import { useContext, useState, useEffect } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";
import Button from "react-bootstrap/esm/Button";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "../ui/Card";

const initialState = {
  firstName: "",
  lastName: "",
};
// const initialInfo = () => {
//   const user = auth.currentUser;
//   if (user !== null) {
//     // The user object has basic properties such as display name, email, etc.
//     const s = user.displayName;
//     console.log(s);
//   }
// };

const ProfileForm = () => {
  // initialInfo();
  const [inputState, setInputState] = useState(initialState);
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const handleChange = (e) => {
    setInputState({ ...inputState, [e.target.name]: e.target.value });
  };

  const logoutHandler = () => {
    authCtx.logout();
  };

  const { firstName, lastName } = inputState;

  const submitHandler = (event) => {
    event.preventDefault();
    updateProfile(auth.currentUser, {
      displayName: `${firstName} ${lastName}`,
    })
      .then((a) => {
        console.log(a);
        navigate("/");
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  return (
    <Card>
      <form onSubmit={submitHandler} className={classes.container}>
        <div>
          <h3>New Information</h3>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <Button variant="outline-danger">Change User's Information</Button>
          <Button variant="outline-danger" onClick={logoutHandler}>
            Logout
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ProfileForm;
