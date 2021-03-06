import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const withAuth = (Component) =>
  function (props) {
    if (typeof window !== 'undefined') {
      const router = useRouter();
      const { user } = useSelector((state) => state.auth);
      if (!user) {
        router.replace('/signin');
        return null;
      }

      return <Component {...props} />;
    }

    return null;
  };

export default withAuth;
