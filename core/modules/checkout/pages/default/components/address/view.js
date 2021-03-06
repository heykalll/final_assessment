import React from 'react';
import Alert from '@material-ui/lab/Alert';
import AddressFormDialog from '@core_modules/customer/plugins/AddressFormDialog';
import Button from '@common_button';
import Typography from '@common_typography';
import _ from 'lodash';
import ModalAddress from '../ModalAddress';
import useStyles from '../style';

const CLOSE_ADDRESS_DIALOG = 350;

const AddressView = (props) => {
    const styles = useStyles();
    const {
        data,
        checkout,
        setAddress,
        setCheckout,
        t,
        dialogProps,
        loading,
        address,
        content,
        manageCustomer,
        isOnlyVirtualProductOnCart,
        ...other
    } = props;
    const { dest_latitude, dest_longitude } = (data && data.cart && data.cart.dest_location) || {};
    const gmapKey = other && other.storeConfig && other.storeConfig.icube_pinlocation_gmap_key;
    const { formik } = other;

    const [openAddress, setOpenAddress] = React.useState(false);
    return (
        <div className={styles.block} id="checkoutAddress">
            <style jsx>
                {`
                    .alert-empty-pin-point :global(.MuiAlert-icon) {
                        font-size: 16px;
                    }
                `}
            </style>
            <ModalAddress
                open={openAddress}
                setOpen={(status) => setOpenAddress(status)}
                t={t}
                checkout={checkout}
                setAddress={setAddress}
                setCheckout={setCheckout}
                manageCustomer={manageCustomer}
                {...other}
            />
            <div className={styles.addressContainer}>
                <div className={styles.addressText}>
                    <Typography variant="title" type="bold" letter="uppercase">
                        {isOnlyVirtualProductOnCart ? t('checkout:billingAddress') : t('checkout:shippingAddress')}
                    </Typography>
                    <Typography variant="p">{content}</Typography>
                </div>
                <div>
                    <AddressFormDialog
                        t={t}
                        onSubmitAddress={async (dataAddress) => {
                            const { cart } = checkout.data;
                            let state = { ...checkout };

                            await setAddress(dataAddress, cart);
                            state.status.addresses = true;
                            setCheckout(state);

                            _.delay(() => {
                                state = { ...checkout };
                                state.status.openAddressDialog = false;
                                setCheckout(state);
                                state.status.addresses = false;
                                setCheckout(state);
                            }, CLOSE_ADDRESS_DIALOG);
                        }}
                        loading={checkout.loading.addresses}
                        success={checkout.status.addresses}
                        open={checkout.status.openAddressDialog}
                        disableDefaultAddress
                        setOpen={() => {
                            setCheckout({
                                ...checkout,
                                status: {
                                    ...checkout.status,
                                    openAddressDialog: false,
                                },
                            });
                        }}
                        pageTitle={t('checkout:address:addTitle')}
                        {...other}
                        {...dialogProps}
                    />
                    {loading.addresses || loading.all ? null : (
                        <Button
                            variant={formik.values.email !== '' && formik.values.email !== formik.values.oldEmail ? 'contained' : 'outlined'}
                            disabled={formik.values.email !== '' && formik.values.email !== formik.values.oldEmail}
                            // href={data.isGuest ? null : '/customer/account/address'}
                            onClick={
                                data.isGuest
                                    ? () => {
                                        setCheckout({
                                            ...checkout,
                                            status: {
                                                ...checkout.status,
                                                openAddressDialog: true,
                                            },
                                        });
                                    }
                                    : () => setOpenAddress(true)
                            }
                        >
                            <Typography variant="p" type="bold" letter="uppercase">
                                {data.isGuest && !address
                                    ? t('common:button:addAddress')
                                    : t(_.isNull(address) ? 'common:button:manage' : 'common:button:change')}
                            </Typography>
                        </Button>
                    )}
                </div>
            </div>
            <div className="alert-empty-pin-point">
                {gmapKey
                    && address
                    && !(loading.addresses || loading.all)
                    && (!dest_latitude || !dest_longitude || (dest_latitude === '0' && dest_longitude === '0')) && (
                    <Alert style={{ fontSize: 10 }} severity="warning">
                        {t('customer:address:emptyPinPointMessage')}
                    </Alert>
                )}
            </div>
        </div>
    );
};

export default AddressView;
