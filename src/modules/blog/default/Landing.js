/* eslint-disable no-nested-ternary */
import React from 'react';
import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import DefaultContent from '../views/Landing';
import CoreBase from '../core/Landing';
import Loader from '../views/Loader/LoaderList';
import WarningInfo from '../views/Info';
import ContentCategory from '../views/ModalCategory';
import ContentItem from '../views/Details';

const Page = (props) => (
    <CoreBase
        Content={DefaultContent}
        ContentCategory={ContentCategory}
        ContentItem={ContentItem}
        Loader={Loader}
        WarningInfo={WarningInfo}
        {...props}
    />
);

Page.getInitialProps = async () => ({
    namespacesRequired: ['blog'],
});

export default withApollo({ ssr: true })(withTranslation()(Page));
