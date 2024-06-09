import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
//layout
import MainLayout from "./layout/MainLayout";

import ProtectedRoutes from "./components/ProtectedRoutes";

//context
import { useContext, useEffect } from "react";
import { GlobalContext } from "./context/UseGlobal";

//pages
import {
  Home,
  Headphones,
  Earphones,
  Speakers,
  SingleProduct,
  Cart,
} from "./pages";
// loaders
import { loader as Homeloader } from "./pages/Home";
import { loader as SingleProductLoader } from "./pages/SingleProduct";

//actions
import Login, { action as LoginAction } from "./pages/Login";
import SignUp, { action as SignUpAction } from "./pages/SignUp";

//firebase
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/firebaseConfig";

function App() {
  const { user, dispatch, authReady } = useContext(GlobalContext);
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
          loader: Homeloader,
        },
        {
          path: "/headphones",
          element: <Headphones />,
        },
        {
          path: "/speakers",
          element: <Speakers />,
        },
        {
          path: "/earphones",
          element: <Earphones />,
        },
        {
          path: "/products/:slug",
          element: <SingleProduct />,
          loader: SingleProductLoader,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: LoginAction,
    },
    {
      path: "/signUp",
      element: user ? <Navigate to="/" /> : <SignUp />,
      action: SignUpAction,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch({ type: "LOG_IN", payload: user });
      dispatch({ type: "AUTH_READY" });
    });

    //
    async function getData() {
      const allData = [];
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.docs.forEach((item) => {
        allData.push({ idf: item.id, ...item.data() });
      });
      dispatch({ type: "INITIAL_DATA", payload: allData });
    }

    getData();
  }, []);

  return <> {authReady && <RouterProvider router={routes} />}</>;
}

export default App;
