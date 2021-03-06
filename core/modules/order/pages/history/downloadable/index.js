import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from './core';
import Content from '../components/downloadable';
import Skeleton from '../components/skeleton';
import ErrorView from '../components/error';

const DefaultOrder = (props) => (
    <Core {...props} Content={Content} Skeleton={Skeleton} ErrorView={ErrorView} />
);

DefaultOrder.getInitialProps = async () => ({
    namespacesRequired: ['common', 'order', 'customer'],
});

export default withApollo({ ssr: true })(withTranslation()(DefaultOrder));
