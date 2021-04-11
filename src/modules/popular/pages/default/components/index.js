/* eslint-disable react/no-danger */
import Typography from '@common_typography';
import { Card, CardContent, CardMedia, Grid, Container } from '@material-ui/core'
import Button from '@common_button';
import useStyles from './style';

const PopularPage = (props) => {
    const styles = useStyles();
    const {
        data, loading, error,
    } = props;
    
    if (loading) {
        return <p>loading</p>;
      }
      if (error) {
        return <p>error</p>;
      }
    return (
        <>
            {/* eslint-disable-next-line react/no-danger */}
            <Typography variant="h5" type="bold" align="left" className={styles.pageTitles}>
                Popular Page
            </Typography>
            <Container>
                <div className="row">
                    {
                        data.products.items.map((product) => {
                            return (
                                <Grid className=' col-md-3 col-xs-6'>
                                    <div key={product.url_key}>
                                        <Card className={styles.card}>
                                            <CardMedia
                                            className='cardMedia'
                                            image={product.image.url}
                                            title='Image title'
                                            />
                                            <CardContent className='cardName'>
                                                <Typography variant='subtitle2'>
                                                    {product.name}
                                                </Typography>
                                            </CardContent>  
                                        </Card>
                                    </div>
                                </Grid>
                            )
                        })
                    }
                </div>
            </Container>
        </>
    );
};

export default PopularPage;
