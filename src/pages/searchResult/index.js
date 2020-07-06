import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import Layout from '@components/Layouts';
import { useRouter } from 'next/router';
import getQueryFromPath from '@helpers/generateQuery';
import { getHost } from '@helpers/config';
import Component from './components';

const Page = (props) => {
    const router = useRouter();
    const { storeConfig } = props;
    const { query } = getQueryFromPath(router);
    const schemaOrg = [
        {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            url: `${getHost()}/`,
            logo: `${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`,
        },
        {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            url: `${getHost()}/`,
            potentialAction: [{
                '@type': 'SearchAction',
                target: `${getHost()}/catalogsearch/result?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
            }],
        },
    ];
    const pageConfig = {
        title: `Search Result : ${query.q}`,
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: `Search Result : ${query.q}`,
        bottomNav: 'browse',
        schemaOrg,
    };
    return (
        <Layout pageConfig={pageConfig} {...props}>
            <Component {...props} />
        </Layout>
    );
};

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'search', 'product'],
});

export default withApollo({ ssr: true })(withTranslation()(Page));
