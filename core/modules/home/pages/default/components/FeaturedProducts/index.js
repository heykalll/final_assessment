/* eslint-disable consistent-return */
import { modules } from '@config';
import gqlService from '../../../../service/graphql';

const FeaturedProducts = ({
    t, ErrorInfo, FeaturedSkeleton, FeaturedView,
}) => {
    const { home } = modules;
    const { loading, data, error } = gqlService.getFeaturedProducts({
        url_key: home.featuresProduct.url_key,
    });

    if (loading && !data) return <FeaturedSkeleton />;
    if (error) {
        return <ErrorInfo variant="error" text={t('home:errorFetchData')} />;
    }
    if (!data || data.categoryList.length === 0) {
        return <ErrorInfo variant="warning" text={t('home:nullData')} />;
    }

    if (!loading && data && data.categoryList.length > 0) {
        const onReInit = () => {
            if (typeof window !== 'undefined') {
                if (document.getElementById('home-featured')) {
                    document.getElementById('home-featured').classList.remove('hide');
                }
                if (document.getElementById('home-featured-skeleton')) {
                    document.getElementById('home-featured-skeleton').classList.add('hide');
                }
            }
        };
        return (
            <>
                <div className="full-width" id="home-featured-skeleton">
                    <FeaturedSkeleton />
                </div>
                <FeaturedView onReInit={onReInit} data={data.categoryList[0].children} t={t} />
            </>
        );
    }
};

export default FeaturedProducts;
