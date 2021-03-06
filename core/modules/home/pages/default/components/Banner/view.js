import Banner from '@common_slick/Banner';
import classNames from 'classnames';
import { breakPointsUp } from '@helper_theme';
import useStyles from '../style';

const BannerView = (props) => {
    const { images, logoUrl } = props;
    const styles = useStyles();
    const desktop = breakPointsUp('sm');
    return (
        <div className={classNames(styles.header)} id="home-banner">
            <div className={classNames(styles.logo, 'hidden-desktop')}>
                <img src={logoUrl} alt="logo" className={styles.imgLogo} />
            </div>
            {images && images.length && <Banner data={images} showArrow={desktop} />}
        </div>
    );
};

export default BannerView;
