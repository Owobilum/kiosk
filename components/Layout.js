import React, { useState, useEffect } from 'react'
import { onAuthStateChanged } from '@firebase/auth';
import { useDispatch, useSelector } from 'react-redux';

import Footer from "./Footer"
import Header from "./Header"
import { auth, } from '../utils/firebase';
import { setUser, storeUserToDb } from '../redux/actions/auth';

const Layout = ({ children }) => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.auth.user)


    useEffect(() => {
        const cancelSubscription = onAuthStateChanged(auth, (user) => {
            if (user) {
                // console.log('USER IS SIGNED IN')
                // dispatch(setUser(user))
                const uid = user.uid;
                // console.log('USER ID IS:', uid)
                let name
                let email
                // name = user.displayName
                email = user.email
                user.displayName ? name = user.displayName : name = null
                // user.email ? email = user.email : email = formData.email
                // !currentUser && dispatch(storeUserToDb(email, uid, name))
                //   storeUserToDb(name,email,date,uid).then(data=>console.log("USER-SNAPSHOT",data.data()))
                //We can then store the snapshot data to state as our current logged in User 
            } else {
                console.log('USER IS SIGNED OUT')
                dispatch(setUser(user))
            }
        });

        return () => cancelSubscription()
    }, [])

    return (
        <div style={{
            backgroundColor: "#F5F5F5",
            border: 'solid 1px #F5F5F5'
        }}>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default Layout