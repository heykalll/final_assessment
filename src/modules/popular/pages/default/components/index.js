/* eslint-disable react/no-danger */
import Typography from '@common_typography';
import Button from '@common_button';
import useStyles from './style';

const PopularPage = (props) => {
    const styles = useStyles();
    const {
        data, loading, error,
    } = props;
    
    console.log(data);
    return (
        <>
            {/* eslint-disable-next-line react/no-danger */}
            {/* <Typography variant="h5" type="bold" align="left" className={styles.pageTitles}>
                {t('contact:contactUs')}
            </Typography>
            <div className="row">
                <div className="col-md-6 col-xs-12">
                    {(!loading && <div className={styles.container} dangerouslySetInnerHTML={{ __html: data.cmsBlocks.items[0].content }} />)}
                    {(loading && <Skeleton />)}
                </div>
                <div className="col-md-6 col-xs-12">
                    <ContactForm {...props} />
                </div>
            </div> */}
            <div>INI POPULAR PAGE</div>
        </>
    );
};

export default PopularPage;
