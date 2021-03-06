import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    CreatePadding, CenterAbsolute, FlexColumn, CreateMargin,
} from '@theme_mixins';
import { WHITE } from '@theme_color';

export default makeStyles((theme) => ({
    container: {
        width: '100%',
        height: '100vh',
        ...CreatePadding(30, 70, 30, 70),
        ...FlexColumn,
        alignItems: 'center',
        overflow: 'hidden',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: 'url("/assets/img/thanks/background.jpg")',
    },
    iconContainer: {
        width: '65%',
        alignItems: 'center',
        justifyContent: 'space-arround',
        position: 'fixed',
        bottom: 120,
        left: 0,
        ...CenterAbsolute,
    },
    imgIcon: {
        width: '100%',
        height: 230,
        overflow: 'hidden',
    },
    title: {
        marginBottom: 30,
        marginLeft: 0,
        fontSize: 30,
        [theme.breakpoints.up('sm')]: {
            marginTop: 30,
            marginLeft: '0px !important',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 18,
            marginBottom: 20,
        },
    },

    info: {
        marginTop: 20,
        width: '100%',
        ...FlexColumn,
        alignItems: 'flex-start',
        [theme.breakpoints.down('sm')]: {
            alignItems: 'center',
            '&> *': {
                textAlign: 'center !important',
            },
        },
    },

    footer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        bottom: 0,
        left: 0,
        ...CenterAbsolute,
        ...CreatePadding(20, 60, 30, 60),
    },
    btnConfirm: {
        height: 30,
        fontSize: 10,
        [theme.breakpoints.up('sm')]: {
            paddingLeft: 0,
        },
    },
    txtConfirm: {
        [theme.breakpoints.up('sm')]: {
            paddingLeft: 10,
        },
    },
    btnConfirmFirst: {
        marginBottom: 15,
    },
    btnConfirmIcon: {
        fontSize: '12px !important',
        marginLeft: -5,
    },
    btnContinue: {
        ...CreateMargin(0, 8, 0, 0),
        width: '90%',
        [theme.breakpoints.up('sm')]: {
            width: 316,
        },
        height: 41,
        bottom: 0,
        left: 0,
        opacity: 'none',
        ...CenterAbsolute,
        color: WHITE,
        borderRadius: 100,
    },
    textBtn: {
        color: `${WHITE} !important`,
    },

    payment: {
        textTransform: 'lowercase',
    },
    dateOver: {
        marginTop: 15,
        marginLeft: '0px !important',
    },

    footerDesktop: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-arround',
    },

    link: {
        cursor: 'pointer',
    },

    // media query
    '@media (max-width: 280px )': {
        container: {
            padding: '20px 20px !important',
        },
        footer: {
            padding: '20px 20px !important',
        },
    },

    '@media (max-width: 320px )': {
        container: {
            padding: '20px 50px',
        },
        footer: {
            ...CreatePadding(20, 60, 20, 60),
        },
        imgIcon: {
            height: 160,
        },
        iconContainer: {
            width: '50%',
            bottom: 100,
        },
    },
    '@media (min-width: 375px )': {
        iconContainer: {
            width: '60%',
        },
    },
    '@media (min-width: 411px )': {
        iconContainer: {
            width: '55%',
        },
    },
    '@media (min-width: 750px )': {
        iconContainer: {
            width: '300px',
            bottom: '12%',
        },
        imgIcon: {
            height: 280,
        },
    },
    '@media (min-width: 1020px )': {
        iconContainer: {
            width: '400px',
            bottom: '10%',
        },
        imgIcon: {
            height: 350,
        },
    },
}));
