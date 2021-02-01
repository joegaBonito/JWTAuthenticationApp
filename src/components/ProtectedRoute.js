import React, { useEffect } from 'react'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import {isAuthenticatedAction, tokens} from '../store/user'
import { useHistory } from "react-router";
import {reactLocalStorage} from 'reactjs-localstorage';

const ProtectedRoute = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();
    let isAuthenticated = false;
    let isLoading = true;
    const {accessToken,refreshToken, isAuthenticatedSelector,isLoadingSelector} = useSelector((state) => ({
        accessToken: state.user.accessToken,
        refreshToken: state.user.refreshToken,
        isAuthenticatedSelector: state.user.isAuthenticated,
        isLoadingSelector: state.user.isLoading
    }));

    useEffect(() => {
        let authStateCheckandUpdate = (response) => {
            if(response.data.success === true) {
                if(response.data.token !== undefined) {
                    console.log('response.data.token: '+ response.data.token)
                    reactLocalStorage.set('accessToken',response.data.token);
                }
                dispatch(isAuthenticatedAction(true,false));
                console.log('isAuthenticatedSelector: ' +isAuthenticatedSelector);
                isAuthenticated = isAuthenticatedSelector;
                console.log('isLoadingSelector: ' +isLoadingSelector);
                isLoading = isLoadingSelector;
            } else {
                // history.push({
                //     pathname:  "/login",
                //     state: {
                //         response: 'Authentication Failed: Token expired.'
                //     } 
                // });
                
                }
            }

        if(reactLocalStorage.get('accessToken') === undefined) {
            history.push({
                pathname:  "/login",
                state: {
                    response: 'Authentication Failed: There is no access token.'
                } 
            });
        } else {
            console.log('accessToken: ' + accessToken);
            console.log('refreshToken: ' + refreshToken);
            let getURL = `http://localhost:3001/api/auth/check?token=${accessToken}`;
            console.log('getURL: ' + getURL);
            return axios.get(getURL)
            .then((response)=> {
                // handle success
                // console.log('data.success: '+response.data.success);
                authStateCheckandUpdate(response);
            })
            .catch((error)=> {
                // handle error
                console.log(error);
                if(reactLocalStorage.get('refreshToken') !== undefined || reactLocalStorage.get('refreshToken') !== null) {
                    let postURL = `http://localhost:3001/api/auth/token`;
                    console.log('postURL: ' + postURL);
                    return axios.post(postURL,{
                        refreshToken:refreshToken
                    })
                    .then((res)=> {
                        if(res.data.success === true) {
                            if(res.data.token !== undefined) {
                                console.log('response.data.token: '+ res.data.token)
                                reactLocalStorage.set('accessToken',res.data.token);
                                dispatch(tokens({accessToken,refreshToken}));
                            }
                            dispatch(isAuthenticatedAction(true,false));
                            console.log('isAuthenticatedSelector: ' +isAuthenticatedSelector);
                            isAuthenticated = isAuthenticatedSelector;
                            console.log('isLoadingSelector: ' +isLoadingSelector);
                            isLoading = isLoadingSelector;
                        } else {
                            history.push({
                                pathname:  "/login",
                                state: {
                                    response: 'Authentication Failed: There is no access token.'
                                } 
                            });
                        }
                    })
                    .catch((error)=> {
                        // handle error
                        console.log(error);
                        history.push({
                            pathname:  "/login",
                            state: {
                                response: 'Authentication Failed: There is no access token.'
                            } 
                        });
                    });
                } else {
                    history.push({
                        pathname:  "/login",
                        state: {
                            response: 'Authentication Failed: There is no access token.'
                        } 
                    });
                }
            });
        }
    },[refreshToken,isAuthenticatedSelector,history]);


    const Component = props.component;
    // console.log('isAuthenticatedSelector: ' + isAuthenticatedSelector);
    if(isAuthenticated) {
        history.push({
            pathname:  "/login",
            state: {
                response: 'Authentication Failed'
            } 
        });
    }
    return (
        // {isLoading} ? <div>Loading...</div> : 
        <Component />
    )
}

export default ProtectedRoute;