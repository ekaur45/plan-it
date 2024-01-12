import React from "react";
import GlobalStyles from 'styles/GlobalStyles';

import {
  RouterProvider
} from "react-router-dom";
import rootRouter from "components/router/RootRouter";
export default function App() {


  return (
    <>
      <GlobalStyles />
      <RouterProvider router={rootRouter} />
    </>
  );
}
