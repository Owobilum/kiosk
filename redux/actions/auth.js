import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import swal from 'sweetalert2';
import {
  SET_AUTH_STATUS,
  SET_USER,
  SET_AUTH_LOADING_START,
  SET_AUTH_LOADING_END,
  SET_CURRENT_PATH,
} from './actionTypes';

import { db, auth, googleProvider } from '../../utils/firebase';
import { MODAL_BTN_COLOR } from '../../utils/constants';
import { handleError } from '../../utils/helpers';

export const setAuthStatus = (isAuthenticated) => ({
  type: SET_AUTH_STATUS,
  payload: isAuthenticated,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const signOutUser = () => (dispatch) => {
  auth.signOut();
  dispatch(setUser(null));
};

export const setAuthLoadingStart = () => ({
  type: SET_AUTH_LOADING_START,
});

export const setAuthLoadingEnd = () => ({
  type: SET_AUTH_LOADING_END,
});

export const setCurrentPath = (path) => ({
  type: SET_CURRENT_PATH,
  payload: path,
});

export const setAddress = (address, id, cb) => async (dispatch) => {
  dispatch(setAuthLoadingStart());
  const docRef = doc(db, 'users', id);
  try {
    await setDoc(doc(db, 'users', id), { address }, { merge: true });
    const userSnap = await getDoc(docRef);
    dispatch(setUser({ ...userSnap.data(), id }));
    cb();
  } catch (error) {
    handleError(error);
  } finally {
    dispatch(setAuthLoadingEnd());
  }
};

export const storeUserToDb =
  (email, id, displayName, otherDetails) => async (dispatch) => {
    const docRef = doc(db, 'users', id); // queryReference
    const docSnap = await getDoc(docRef); // qurerySnapshot
    const createdAt = new Date();
    if (docSnap.exists()) {
      dispatch(setUser({ ...docSnap.data(), id }));
    } else {
      let data;
      if (otherDetails && displayName) {
        data = {
          displayName,
          email,
          createdAt,
          ...otherDetails,
        };
      } else if (!displayName && otherDetails) {
        data = {
          email,
          createdAt,
          ...otherDetails,
        };
      } else if (displayName && !otherDetails) {
        data = {
          email,
          displayName,
          createdAt,
        };
      } else {
        data = {
          email,
          createdAt,
        };
      }
      try {
        await setDoc(doc(db, 'users', id), data); // setDoc needs an ID from us. addDoc get auto-generated ID
        const userSnap = await getDoc(docRef);
        dispatch(setUser({ ...userSnap.data(), id }));
      } catch (error) {
        handleError(error);
      }
    }
  };

export const signInWithGoogle = (cb) => async (dispatch) => {
  dispatch(setAuthLoadingStart());
  try {
    const res = await signInWithPopup(auth, googleProvider);
    if (res?.user) {
      const { displayName, email, uid } = res.user;
      await dispatch(storeUserToDb(email, uid, displayName));
      cb();
    }
  } catch (error) {
    handleError(error);
  } finally {
    dispatch(setAuthLoadingEnd());
  }
};

export const signUpWithEmail =
  (email, password, otherDetails, cb) => async (dispatch) => {
    dispatch(setAuthLoadingStart());
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (res?.user) {
        await dispatch(storeUserToDb(email, res.user.uid, null, otherDetails));
        cb();
      }
    } catch (error) {
      handleError(error);
    } finally {
      dispatch(setAuthLoadingEnd());
    }
  };

export const signInWithEmail = (email, password, cb) => async (dispatch) => {
  dispatch(setAuthLoadingStart());
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    if (res?.user) {
      await dispatch(storeUserToDb(email, res.user.uid));
      cb();
    }
  } catch (error) {
    handleError(error);
  } finally {
    dispatch(setAuthLoadingEnd());
  }
};

export const resetPassword = (email) => async (dispatch) => {
  dispatch(setAuthLoadingStart());
  try {
    await sendPasswordResetEmail(auth, email);
    swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Password recovery email sent',
      confirmButtonColor: MODAL_BTN_COLOR,
    });
  } catch (error) {
    handleError(error);
  } finally {
    dispatch(setAuthLoadingEnd());
  }
};

export const getUser = (id, cb) => async (dispatch) => {
  try {
    const docRef = doc(db, 'users', id);
    const docSnap = await getDoc(docRef);
    dispatch(setUser({ ...docSnap.data(), id }));
  } catch (error) {
    handleError(error);
  } finally {
    cb();
  }
};
