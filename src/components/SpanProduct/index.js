import React from 'react';
import { Grid } from '@material-ui/core';
import Typography from '@components/Typography';
import Button from '@components/Button';
import useStyles from './style';

const SpanProduct = ({
    imageSrc, name, description,
}) => {
    const styles = useStyles();
    return (
        <div className={styles.container}>
            <Grid container justify="center">
                <Grid item sm={12} md={12} lg={12}>
                    <div className={styles.imageContainer}>
                        <img src={imageSrc || '/assets/img/noun_Image.svg'} alt={name} />
                    </div>
                </Grid>
                <Grid item sm={12} md={12} lg={12}>
                    <div className={styles.contentContainer}>
                        <Typography variant="title" type="bold" align="center">
                            {name}
                        </Typography>
                        <Typography variant="p">
                            {description}
                        </Typography>
                        <Button variant="text">
                            <Typography variant="span" type="bold" className={styles.textBtn}>
                                SHOP NOW
                            </Typography>
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default SpanProduct;
