import React, { useState, useEffect } from 'react'
import { onAuthStateChanged } from '@firebase/auth';
import { useDispatch } from 'react-redux';

import Footer from "./Footer"
import Header from "./Header"
import { auth, } from '../utils/firebase';
import { setUser } from '../redux/actions/auth';

const Layout = ({ children }) => {
    const dispatch = useDispatch()

    const cancelSubscription = onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log('USER IS SIGNED IN')
            dispatch(setUser(user))
            let date = new Date()
            const uid = user.uid;
            // console.log('USER ID IS:', uid)
            let name
            let email
            user.displayName ? name = user.displayName : name = formData.displayName
            user.email ? email = user.email : email = formData.email
            //   storeUserToDb(name,email,date,uid).then(data=>console.log("USER-SNAPSHOT",data.data()))
            //We can then store the snapshot data to state as our current logged in User 
        } else {
            console.log('USER IS SIGNED OUT')
            dispatch(setUser(null))
        }
    });

    useEffect(() => {
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