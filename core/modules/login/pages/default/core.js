/* eslint-disable no-use-before-define */
/* eslint-disable eqeqeq */
/* eslint-disable no-shadow */
import Layout from '@layout';
import { setLogin, getLastPathWithoutLogin } from '@helper_auth';
import { setCartId, getCartId } from '@helper_cartid';
import { useQuery } from '@apollo/client';
import {
    expiredToken, custDataNameCookie, recaptcha, modules,
} from '@config';
import Router from 'next/router';
import Cookies from 'js-cookie';
import { regexPhone } from '@helper_regex';
import { useFormik } from 'formik';
import dynamic from 'next/dynamic';
import * as Yup from 'yup';
import firebase from 'firebase/app';
import React from 'react';
import { getAppEnv } from '@helpers/env';
import {
    getToken, getTokenOtp, removeToken as deleteToken, otpConfig as queryOtpConfig,
    getCustomerCartId, mergeCart as mutationMergeCart, socialLogin, getSigninMethodSocialLogin,
} from '../../services/graphql';
import { getCustomer } from '../../services/graphql/schema';

const Message = dynamic(() => import('@common_toast'), { ssr: false });
const appEnv = getAppEnv();

const Login = (props) => {
    const {
        t, storeConfig, query, lastPathNoAuth, Content, pageConfig,
    } = props;
    const config = {
        title: t('login:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('login:pageTitle'),
        headerBackIcon: 'close',
        bottomNav: false,
    };
    const [isOtp, setIsOtp] = React.useState(false);
    const [isDidUpdate, setIsDidUpdate] = React.useState({});
    const [isRevokeToken, setRevokeToken] = React.useState(false);
    const [disabled, setDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [cusIsLogin, setIsLogin] = React.useState(0);

    // Listen to the Firebase Auth state and set the local state.

    React.useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
            if (firebase.auth().currentUser) {
                const fullname = user.displayName.split(' ');
                const firstName = fullname[0];
                let lastName = '';
                const { email } = user;
                fullname.forEach((entry) => {
                    if (entry != firstName) {
                        lastName += `${entry} `;
                    }
                });
                firebase.auth().currentUser.getIdToken(true).then((user) => {
                    setDisabled(true);
                    setLoading(true);
                    window.backdropLoader(true);
                    actSocialLogin({
                        variables: {
                            email,
                            socialtoken: user,
                            firstname: firstName,
                            lastname: lastName,
                        },
                    }).then(async () => {
                        setLogin(1, expired);
                        await setIsLogin(1);
                        getCart();
                    }).catch((e) => {
                        setDisabled(false);
                        setLoading(false);
                        window.backdropLoader(false);
                        window.toastMessage({
                            open: true,
                            variant: 'error',
                            text: e.message.split(':')[0] || t('login:failed'),
                        });
                    });
                });
            }
        });
        return () => unregisterAuthObserver();
    }, []);

    const [state, setState] = React.useState({
        toastMessage: {
            open: true,
            variant: 'error',
            text: t('validate:guest:wrong'),
        },
        backdropLoader: false,
    });

    let cartId = '';
    const handleCloseMessage = () => {
        setState({
            ...state,
            toastMessage: {
                ...state.toastMessage,
                open: false,
            },
        });
    };
    let toastMessage = '';
    if (typeof window !== 'undefined') {
        const res = window.location.href.split('&');
        if (res[1]) {
            const error = res[1].split('error=');
            if (error[1]) {
                toastMessage = (
                    <Message
                        open={state.toastMessage.open}
                        variant={state.toastMessage.variant}
                        setOpen={handleCloseMessage}
                        message={state.toastMessage.text}
                    />
                );
            }
        }
    }
    let redirectLastPath = lastPathNoAuth;
    const expired = storeConfig.oauth_access_token_lifetime_customer
        ? new Date(Date.now() + parseInt(storeConfig.oauth_access_token_lifetime_customer, 10) * 3600000)
        : expiredToken;

    if (typeof window !== 'undefined') {
        cartId = getCartId();
        if (lastPathNoAuth === '' || !lastPathNoAuth) {
            redirectLastPath = getLastPathWithoutLogin();
        }
    }

    const [deleteTokenGql] = deleteToken();
    const [getCustomerToken] = getToken();
    const [getCustomerTokenOtp] = getTokenOtp();
    const [getCart, cartData] = getCustomerCartId();
    const [mergeCart, { called }] = mutationMergeCart();

    const [actSocialLogin] = socialLogin();

    // get login method social login
    const socialLoginMethod = getSigninMethodSocialLogin();
    const otpConfig = queryOtpConfig();
    const custData = useQuery(getCustomer, {
        context: {
            request: 'internal',
        },
        skip: !cusIsLogin,
        fetchPolicy: 'no-cache',
    });

    // handle revoke token
    React.useEffect(() => {
        if (!isRevokeToken && typeof window !== 'undefined') {
            setRevokeToken(true);
            deleteTokenGql();
        }
    }, [isRevokeToken]);

    // togle disabled when user just switch to otp mode
    React.useEffect(() => {
        if (isDidUpdate.isOtp && formik.dirty) {
            /* only validate form when:
                isOtp changed for not first time / initial && formik is dirty
            */
            formik.validateForm();
        } else {
            setIsDidUpdate({ isOtp: true });
        }

        // disabled when user switch to otp mode
        setDisabled(isOtp);
    }, [isOtp]);

    // enable recaptcha
    const enableRecaptcha = recaptcha.enable && modules.login.recaptcha.enabled;

    const LoginSchema = Yup.object().shape({
        username: Yup.string().email(t('validate:email:wrong')).required(t('validate:email:required')),
        password: Yup.string().required(t('validate:password:required')),
        captcha: enableRecaptcha && Yup.string().required(t('validate:captcha:required')),
    });
    const LoginOtpSchema = Yup.object().shape({
        username: Yup.string().required(t('validate:phoneNumber:required')).matches(regexPhone, t('validate:phoneNumber:wrong')),
        otp: Yup.number().required('Otp is required'),
        captcha: enableRecaptcha && Yup.string().required(t('validate:captcha:required')),
    });

    const handleSubmit = (formOtp, variables) => {
        let getTokenCustomer;
        if (formOtp) {
            getTokenCustomer = getCustomerTokenOtp;
        } else {
            getTokenCustomer = getCustomerToken;
        }
        setDisabled(true);
        setLoading(true);
        window.backdropLoader(true);
        const sendData = (data) => {
            getTokenCustomer({
                variables: data,
            })
                .then(async (res) => {
                    let token = '';
                    if (formOtp) {
                        token = res.data.internalGenerateCustomerTokenOtp.token;
                    } else {
                        token = res.data.internalGenerateCustomerToken.token;
                    }
                    if (token) {
                        setLogin(1, expired);
                        await setIsLogin(1);
                        getCart();
                    }
                })
                .catch((e) => {
                    setDisabled(false);
                    setLoading(false);
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: e.message.split(':')[0] || t('login:failed'),
                    });
                });
        };
        if (enableRecaptcha) {
            fetch('/captcha-validation', {
                method: 'post',
                body: JSON.stringify({
                    response: variables.captcha,
                }),
                headers: { 'Content-Type': 'application/json' },
            })
                .then((data) => data.json())
                .then((json) => {
                    if (json.success) {
                        sendData(variables);
                    } else {
                        setDisabled(false);
                        setLoading(false);
                        window.backdropLoader(false);
                        window.toastMessage({
                            open: true,
                            variant: 'error',
                            text: t('register:failed'),
                        });
                    }
                })
                .catch(() => {
                    setDisabled(false);
                    setLoading(false);
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: t('common:error:fetchError'),
                    });
                });

            recaptchaRef.current.reset();
        } else {
            sendData(variables);
        }
    };

    const formikOtp = useFormik({
        initialValues: {
            username: '',
            otp: '',
            captcha: '',
        },
        validationSchema: LoginOtpSchema,
        onSubmit: (values) => {
            const variables = {
                username: values.username,
                otp: values.otp,
                captcha: values.captcha,
            };
            handleSubmit(true, variables);
        },
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            otp: '',
            captcha: '',
        },
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            const variables = {
                username: values.username,
                password: values.password,
                captcha: values.captcha,
            };
            handleSubmit(false, variables);
        },
    });
    if (cartData.data && custData.data) {
        Cookies.set(custDataNameCookie, {
            email: custData.data.customer.email,
            firstname: custData.data.customer.firstname,
        });
        const custCartId = cartData.data.customerCart.id;
        if (cartId === '' || !cartId) {
            setCartId(custCartId, expired);
            setDisabled(false);
            window.backdropLoader(false);
            window.toastMessage({ open: true, variant: 'success', text: t('login:success') });
            if (query && query.redirect) {
                setTimeout(() => {
                    Router.push(query.redirect);
                }, 1500);
            } else if (redirectLastPath && redirectLastPath !== '') {
                Router.push(redirectLastPath);
            } else {
                Router.push('/customer/account');
            }
        } else if (!called && (cartId !== custCartId)) {
            mergeCart({
                variables: {
                    sourceCartId: cartId,
                    destionationCartId: custCartId,
                },
            })
                .then(async (res) => {
                    await setCartId(res.data.mergeCarts.id, expired);
                    await setDisabled(false);
                    window.backdropLoader(false);
                    window.toastMessage({ open: true, variant: 'success', text: t('login:success') });
                    setTimeout(() => {
                        if (query && query.redirect) {
                            Router.push(query.redirect);
                        } else if (redirectLastPath && redirectLastPath !== '') {
                            Router.push(redirectLastPath);
                        } else {
                            Router.push('/customer/account');
                        }
                    }, 1500);
                })
                .catch(() => {});
        } else if (query && query.redirect) {
            Router.push(query.redirect);
        } else if (redirectLastPath && redirectLastPath !== '') {
            Router.push(redirectLastPath);
        }
    }
    let socialLoginMethodData = [];
    if (socialLoginMethod.data && socialLoginMethod.data.getSigninMethodSocialLogin
        && socialLoginMethod.data.getSigninMethodSocialLogin.signin_method_allowed
        && socialLoginMethod.data.getSigninMethodSocialLogin.signin_method_allowed !== '') {
        socialLoginMethodData = socialLoginMethod.data.getSigninMethodSocialLogin.signin_method_allowed.split(',');
    }

    const handleChangeCaptcha = (value) => {
        formik.setFieldValue('captcha', value || '');
    };

    const recaptchaRef = React.createRef();
    const sitekey = (recaptcha.siteKey[appEnv])
        ? recaptcha.siteKey[appEnv] : recaptcha.siteKey.dev;

    return (
        <Layout {...props} pageConfig={pageConfig || config}>
            <Content
                formik={formik}
                otpConfig={otpConfig}
                isOtp={isOtp}
                setIsOtp={setIsOtp}
                t={t}
                setDisabled={setDisabled}
                disabled={disabled}
                loading={loading}
                formikOtp={formikOtp}
                toastMessage={toastMessage}
                socialLoginMethodLoading={socialLoginMethod.loading}
                socialLoginMethodData={socialLoginMethodData}
                enableRecaptcha={enableRecaptcha}
                sitekey={sitekey}
                handleChangeCaptcha={handleChangeCaptcha}
                recaptchaRef={recaptchaRef}
            />
        </Layout>
    );
};

export default Login;
