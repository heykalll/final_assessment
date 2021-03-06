import { getCartId, setCartId } from '@helper_cartid';
import { getLoginInfo } from '@helper_auth';
import { useApolloClient } from '@apollo/client';
import { localTotalCart } from '@services/graphql/schema/local';
// import Router from 'next/router';
import React, { useState } from 'react';
import TagManager from 'react-gtm-module';
import { addSimpleProductsToCart, getGuestCartId as queryGetGuestCartId, getCustomerCartId } from '../../../services/graphql';

const CoreSimpleOptionItem = ({
    setOpen = () => {},
    t,
    data,
    View,
    handleAddToCart: CustomAddToCart,
    loading: customLoading,
    setLoading: setCustomLoading,
    ...other
}) => {
    const [qty, setQty] = React.useState(1);
    const client = useApolloClient();
    let cartId = '';
    let isLogin = '';
    const {
        __typename, sku, name, categories,
        price_range, stock_status,
    } = data;

    if (typeof window !== 'undefined') {
        isLogin = getLoginInfo();
        cartId = getCartId();
    }

    const [addCartSimple] = addSimpleProductsToCart();
    const [getGuestCartId] = queryGetGuestCartId();
    const cartUser = getCustomerCartId();
    let [loading, setLoading] = useState(false);

    if (typeof customLoading !== 'undefined' && typeof setCustomLoading === 'function') {
        loading = customLoading;
        setLoading = setCustomLoading;
    }

    const handleAddToCart = async () => {
        if (CustomAddToCart && typeof CustomAddToCart === 'function') {
            CustomAddToCart({
                ...data,
                qty: parseFloat(qty),
            });
        } else {
            setLoading(true);
            const errorMessage = {
                variant: 'error',
                text: t('product:failedAddCart'),
                open: true,
            };
            if (!cartId || cartId === '' || cartId === undefined) {
                if (!isLogin) {
                    await getGuestCartId()
                        .then((res) => {
                            const token = res.data.createEmptyCart;
                            cartId = token;
                            setCartId(token);
                        })
                        .catch((e) => {
                            setLoading(false);
                            window.toastMessage({
                                ...errorMessage,
                                text: e.message.split(':')[1] || errorMessage.text,
                            });
                        });
                } else {
                    const token = cartUser.data.customerCart.id || '';
                    cartId = token;
                    setCartId(token);
                }
            }
            if (__typename === 'SimpleProduct') {
                TagManager.dataLayer({
                    dataLayer: {
                        event: 'addToCart',
                        eventLabel: name,
                        ecommerce: {
                            currencyCode: price_range.minimum_price.regular_price.currency || 'USD',
                            add: {
                                products: [{
                                    name,
                                    id: sku,
                                    price: price_range.minimum_price.regular_price.value || 0,
                                    category: categories.length > 0 ? categories[0].name : '',
                                    list: categories.length > 0 ? categories[0].name : '',
                                    quantity: qty,
                                    dimensions4: stock_status,
                                }],
                            },
                        },
                    },
                });
                addCartSimple({
                    variables: {
                        cartId,
                        sku,
                        qty: parseFloat(qty),
                    },
                })
                    .then((res) => {
                        client.writeQuery({ query: localTotalCart, data: { totalCart: res.data.addSimpleProductsToCart.cart.total_quantity } });
                        window.toastMessage({
                            variant: 'success',
                            text: t('product:successAddCart'),
                            open: true,
                        });
                        setLoading(false);
                        setOpen(false);
                    })
                    .catch((e) => {
                        setLoading(false);
                        window.toastMessage({
                            ...errorMessage,
                            text: e.message.split(':')[1] || errorMessage.text,
                        });
                    });
            }
        }
    };

    return (
        <View
            qty={qty}
            setQty={setQty}
            handleAddToCart={handleAddToCart}
            t={t}
            loading={loading}
            disabled={stock_status === 'OUT_OF_STOCK'}
            {...other}
        />
    );
};

export default CoreSimpleOptionItem;
