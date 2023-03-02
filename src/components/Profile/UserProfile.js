import ProfileForm from "./ProfileForm";
import classes from "./UserProfile.module.css";
import { getAuth, updateProfile } from "firebase/auth";

const UserProfile = () => {
  return (
    <section className={classes.profile}>
      <ProfileForm />
    </section>
  );
};

export default UserProfile;
