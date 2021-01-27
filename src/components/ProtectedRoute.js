import React, { useState,useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import {isAuthenticatedAction, isLoadingAction} from '../store/user'
import { useHistory } from "react-router";

const ProtectedRoute = (props) => {

    let isAuthenticated = false;
    let isLoading = true;
    const dispatch = useDispatch();
    const history = useHistory();

    const {accessToken, refreshToken, isAuthenticatedSelector,isLoadingSelector} = useSelector((state) => ({
        accessToken: state.user.accessToken,
        refreshToken: state.user.refreshToken,
        isAuthenticatedSelector: state.user.isAuthenticated,
        isLoadingSelector: state.user.isLoading
    }));

    useEffect(() => {
        if(accessToken == undefined || refreshToken == undefined) {
            history.push({
                pathname:  "/login",
                state: {
                  response: 'Authentication Failed'
                } 
            });
        } else {
        // console.log('accessToken: ' + accessToken);
        // console.log('refreshToken: ' + refreshToken);
            let getURL = `http://localhost:3001/api/auth/check?token=${accessToken}`;
            console.log('getURL: ' + getURL);
            return axios.get(getURL)
            .then((response)=> {
                // handle success
                // console.log('data.success: '+response.data.success);
                if(response.data.success === true) {
                    dispatch(isLoadingAction(false));
                    isLoading = isLoadingSelector;

                    dispatch(isAuthenticatedAction(true));
                    console.log('isAuthenticatedSelector: ' +isAuthenticatedSelector);
                    isAuthenticated = isAuthenticatedSelector;
                    console.log('isAuthenticated: ' +isAuthenticated);
                } else {                    
                    dispatch(isLoadingAction(false));
                    isLoading = isLoadingSelector;

                    dispatch(isAuthenticatedAction(false));
                    console.log('isAuthenticatedSelector: ' +isAuthenticatedSelector);
                    isAuthenticated = isAuthenticatedSelector;
                    console.log('isAuthenticated: ' +isAuthenticated);
                }
            })
            .catch((error)=> {
                // handle error
                console.log(error);
                dispatch(isLoadingAction(false));
                isLoading = isLoadingSelector;

                dispatch(isAuthenticatedAction(false));
                console.log('isAuthenticatedSelector: ' +isAuthenticatedSelector);
                isAuthenticated = isAuthenticatedSelector;
                console.log('isAuthenticated: ' +isAuthenticated);
            });
        }
    },[accessToken,refreshToken,isAuthenticatedSelector,isLoadingSelector]);

        const Component = props.component;
        if(isAuthenticated) {
            history.push({
                pathname:  "/login",
                state: {
                  response: 'Authentication Failed'
                } 
            });
        }
        return (
            // isLoading ? (<div>Loading...</div>) : (
                <Component />
            // )   
        )
}

export default ProtectedRoute;