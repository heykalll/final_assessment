/* eslint-disable jsx-a11y/anchor-is-valid */
import Button from '@material-ui/core/IconButton';
import PriceFormat from '@common_priceformat';
import RatingStar from '@common_ratingstar';
import Typography from '@common_typography';
import { modules } from '@config';
import Link from '@material-ui/core/Link';
import React from 'react';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorderOutlined from '@material-ui/icons/FavoriteBorderOutlined';
import classNames from 'classnames';
import useStyles from '../style';

const Detail = (props) => {
    const {
        spesificProduct, handleClick, name, handleFeed, ratingValue, __typename, price_range, price_tiers,
        feed, special_from_date, special_to_date, enableWishlist,
        enableRating, enablePrice = true,
    } = props;
    const styles = useStyles();
    const classFeedActive = classNames(styles.iconFeed, styles.iconActive);
    const FeedIcon = feed ? <Favorite className={classFeedActive} /> : <FavoriteBorderOutlined className={styles.iconFeed} />;
    const showWishlist = typeof enableWishlist !== 'undefined' ? enableWishlist : modules.wishlist.enabled;
    const showRating = typeof enableRating !== 'undefined' ? enableRating : modules.catalog.productListing.rating;
    return (
        <div className={styles.descItem}>
            {showWishlist && (
                <Button
                    className={styles.btnFeed}
                    onClick={handleFeed}
                >
                    {FeedIcon}
                </Button>
            )}
            <Link onClick={handleClick} className={styles.productLinkButton}>
                <Typography variant="p" className={styles.productTitle} letter="capitalize">
                    {name}
                </Typography>
            </Link>
            {showRating && <RatingStar value={ratingValue} />}
            { enablePrice && (
                <PriceFormat
                    // eslint-disable-next-line camelcase
                    priceRange={spesificProduct.price_range ? spesificProduct.price_range : price_range}
                    // eslint-disable-next-line camelcase
                    priceTiers={spesificProduct.price_tiers ? spesificProduct.price_tiers : price_tiers}
                    productType={__typename}
                    specialFromDate={special_from_date}
                    specialToDate={special_to_date}
                />
            ) }
        </div>
    );
};

export default Detail;
