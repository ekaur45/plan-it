import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import ECommerce from './pages/Dashboard/ECommerce';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import routes from './routes';
import Protected from './guards/Protected';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import VerficationPage from './pages/Verification/VerificationPage';
const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
       <ToastContainer />
      <Routes>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/verfication" element={<VerficationPage />} />
        <Route element={<Protected component={<DefaultLayout />}/>}>
          <Route index element={ <Protected component={<ECommerce />} /> } />
          {routes.map((routes, index) => {
            const { path, component: Component,roles } = routes;
            return (
              routes.protected?<Route
              key={index}
              path={path}
              element={
                <Suspense fallback={<Loader />}>
                  <Protected component={<Component />} roles={roles}/>                  
                </Suspense>
              }/>:
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    <Component />
                  </Suspense>
                }
              />
            );
          })}
        </Route>
      </Routes>
    </>
  );
}

export default App;
