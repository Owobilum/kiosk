import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Footer from './Footer';
import Header from './Header';
import { setCurrentPath } from '../redux/actions/auth';

function Layout({ children }) {
  const dispatch = useDispatch();

  useEffect(
    () => () => {
      dispatch(setCurrentPath(null));
    },
    []
  );

  return (
    <div
      style={{
        backgroundColor: '#F5F5F5',
        border: 'solid 1px #F5F5F5',
      }}
    >
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
