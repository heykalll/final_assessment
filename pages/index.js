import Home from "../src/components/home";
import Layout from "../src/theme/layout";

export async function getStaticProps() {

    // Page Configuration:
    // - title
    // - className
    const pageConfig = {
        title: "Homepage",
        className: "home"
    };

    // By returning { props: pageConfig }, the Page component
    // will receive `pageConfig` as a prop at build time
    return {
        props: {
            pageConfig
        }
    };
}

export default Layout(Home);
