/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Link from 'next/link';
import Thumbor from '@common_image';
import { formatPrice } from '@helper_currency';
import { useTranslation } from '@i18n';

const Item = (props) => {
    const {
        quantity, prices, product, deleteCart, updateCart, id, configurable_options, bundle_options,
    } = props;
    const { t } = useTranslation(['common']);
    return (
        <li>
            <div className="product">
                <a className="product-item-photo">
                    <Thumbor
                        className="product-image-photo"
                        src={product.small_image.url}
                        alt={product.small_image.label}
                        width={61}
                        height={75}
                    />
                    {
                        prices.row_total_including_tax.value === 0 ? (<span>{t('common:title:free')}</span>) : null
                    }
                </a>
                <div className="product-item-details">
                    <strong className="product-item-name">
                        <Link href="/[...slug]" as={`/${product.url_key}`}><a>{product.name}</a></Link>
                    </strong>
                    {configurable_options && configurable_options.length ? (
                        <div className="product-options">
                            {configurable_options.map((val, idx) => (
                                <div className="option-wrapper" key={idx}>
                                    <strong>{val.option_label}</strong>
                                    {' '}
                                    :
                                    {' '}
                                    {val.value_label}
                                </div>
                            ))}
                        </div>
                    ) : null}
                    {bundle_options && bundle_options.length ? (
                        <div className="product-options">
                            {bundle_options.map((val, idx) => (
                                <div className="option-wrapper" key={idx}>
                                    <strong>{val.label}</strong>
                                    {' '}
                                    :
                                    <div className="option-wrapper__item">
                                        {val.values.map((item, idt) => (
                                            <div key={idt}>
                                                {item.quantity}
                                                {' '}
                                                x
                                                {item.label}
                                                {' '}
                                                <strong>
                                                    + $
                                                    {item.price}
                                                </strong>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : null}
                </div>
                <div className="product-item-pricing">
                    <div className="details-qty qty">
                        <label
                            className="label"
                            htmlFor="cart-item"
                        >
                            Qty
                        </label>

                        <span className="item-minus qty-update" onClick={() => (quantity > 1 ? updateCart(id, quantity - 1) : '')} />
                        <span className="item-count">{quantity}</span>
                        <span className="item-plus qty-update" onClick={() => updateCart(id, quantity + 1)} />
                    </div>
                    <div className="item-price">
                        {formatPrice(
                            prices.row_total_including_tax.value, prices.row_total_including_tax.currency || 'IDR',
                        )}
                    </div>
                </div>

                { product.stock_status === 'OUT_OF_STOCK' && (
                    <div className="oos-info">
                        <span className="oos-info-content">{t('common:cart:oos')}</span>
                    </div>
                ) }
                <div
                    className="delete"
                    onClick={() => {
                        deleteCart(id);
                    }}
                >
                    x
                </div>

            </div>
        </li>
    );
};

export default Item;
