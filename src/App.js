import { useContext } from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";

import Auth from "./pages/Auth";

import AllImages from "./pages/AllImages";
import Detail from "./pages/Detail";
import AddImage from "./pages/AddImage";
import NotFound from "./pages/NotFound";
import UserProfile from "./components/Profile/UserProfile";
import MyBoards from "./pages/MyBoards";
import MyBoardsImages from "./pages/MyBoardsImages";
import MyCreation from "./pages/MyCreation";
import MyImgPage from "./pages/MyImgPage";

import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import AuthContext from "./store/auth-context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const authCtx = useContext(AuthContext);
  // const navigate = useNavigate();
  // const [user, setUser] = useState(null);
  // useEffect(() => {
  //   auth.onAuthStateChanged((authUser) => {
  //     if (authUser) {
  //       setUser(authUser);
  //       const token = authUser.getIdToken();
  //       console.log(user);
  //       console.log(token);
  //     } else {
  //       setUser(null);
  //     }
  //   });
  // }, []);

  // const handleLogout = () => {
  //   signOut(auth).then(() => {
  //     setUser(null);
  //     navigate("/auth");
  //   });
  // };
  const isLogin = authCtx.isLoggedIn;

  return (
    <Layout>
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<AllImages />} />
        {/* <Route
          path="/saved"
          element={isLogin ? <SavedImage /> : <Navigate to="/auth" />}
        /> */}
        <Route
          path="/newImage"
          element={isLogin ? <AddImage /> : <Navigate to="/auth" />}
          style={{ backgroundColor: "rgba(50, 20, 50,0.2)" }}
        />
        <Route
          path="/image/:imageId"
          element={isLogin ? <Detail /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={isLogin ? <Navigate to="/profile" /> : <Auth />}
        />
        <Route
          path="/profile"
          element={isLogin ? <UserProfile /> : <Navigate to="/auth" />}
        />

        <Route
          path="/my-boards/:userId"
          element={isLogin ? <MyImgPage /> : <Navigate to="/auth" />}
        >
          <Route
            index
            element={isLogin ? <MyBoards /> : <Navigate to="/auth" />}
          />
          <Route
            path="created"
            element={isLogin ? <MyCreation /> : <Navigate to="/auth" />}
          />
        </Route>

        <Route
          path="/my-boards/:userId/:boardId"
          element={<MyBoardsImages />}
        />
        <Route
          path="/update/:imgId"
          element={isLogin ? <AddImage /> : <Navigate to="/auth" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;

{
  /* <Route
path="/my-boards/:userId"
element={isLogin ? <MyBoards /> : <Navigate to="/auth" />}
>
<Route path=":boardId" element={<MyBoardsImages />} />
</Route> */
}
