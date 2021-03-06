import React from 'react';
import Component from './view';
import { updateCustomerAddress } from '../../../../services/graphql';

const ItemAddressCore = (props) => {
    const { manageCustomer, handleChange } = props;
    const [updateAddress] = updateCustomerAddress();
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const handleSave = async (data) => {
        setLoading(true);
        updateAddress({
            variables: {
                ...data,
            },
        }).then(async () => {
            if (data.defaultShippingBilling) {
                await new Promise(() => {
                    handleChange({
                        target: {
                            value: data.addressId,
                        },
                    });
                });
            }
            setSuccess(true);
            setLoading(false);
            setTimeout(() => {
                setOpen(false);
                setSuccess(false);
                manageCustomer.refetch();
            }, 1500);
        }).catch(() => {
            setSuccess(false);
            setLoading(false);
        });
    };

    return (
        <Component
            {...props}
            loading={loading}
            handleSave={handleSave}
            setOpen={setOpen}
            success={success}
            open={open}
        />
    );
};

export default ItemAddressCore;
