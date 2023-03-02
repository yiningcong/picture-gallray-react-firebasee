import AuthForm from "../components/Auth/AuthForm";

const Auth = ({ setUser }) => {
  return (
    <div>
      <AuthForm setUser={setUser} />
    </div>
  );
};
export default Auth;
