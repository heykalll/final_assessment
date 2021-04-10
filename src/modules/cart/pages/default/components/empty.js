import Typography from '@common_typography';
import Image from '@common_image';
import Button from '@common_button';
import Link from 'next/link';
import classNames from 'classnames';
import useStyles from './style';

const EmptyView = (props) => {
    const styles = useStyles();
    const { t } = props;
    return (
        <div className={classNames(styles.container, styles.containerEmpty, 'row center-xs')}>
            <div className={"col-xs-12"}>
                <Image
                    src='/assets/img/placeholder.png'
                    alt="Empty Image"
                    width={400}
                    height={400}
                    quality={80}
                />
            </div>
            <div className="col-xs-12">
                <Typography variant="span" type="regular" align="center">
                    <span className={styles.emptyCart}>{t('cart:empty:text')}</span>
                </Typography>
            </div>
            <div className={classNames(styles.butonEmpty, 'col-xs-12')}>
                <Link href="/">
                    <a>
                        <Button className={styles.toolbarButton}>
                            {t('common:button:continueShopping')}
                        </Button>
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default EmptyView;
