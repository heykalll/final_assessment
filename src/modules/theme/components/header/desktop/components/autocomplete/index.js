/* eslint-disable no-plusplus */
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Router from 'next/router';
import { getProduct, getCategoryByName } from '@core_modules/theme/services/graphql';

let globalTimeout = null;

const generateItemData = (product, category) => {
    const result = [];
    for (let index = 0; index < product.items.length; index++) {
        const element = product.items[index];
        const prod = {
            id: element.id,
            name: element.name,
            url_key: element.url_key,
            position: index,
            small_image: element.small_image,
            price_range: element.price_range,
            type: 'product',
        };
        result.push(prod);
    }
    for (let index = 0; index < category.length; index++) {
        const element = category[index];
        const cat = {
            id: element.id,
            name: element.name,
            url_key: element.url_path,
            breadcrumbs: element.breadcrumbs,
            position: index,
            type: 'category',
        };
        result.push(cat);
    }
    return result;
};

export default function ComboBox(props) {
    const {
        handleSearch, setValue, OptionsItem, width = 300, maxHeight = '80vh',
    } = props;
    const [item, setItem] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [close, setClose] = React.useState(false);
    const [search, setSearch] = React.useState('');

    const [
        actGetProduct,
        { loading, data, called },
    ] = getProduct(search);

    const [
        actGetCategory,
        { data: dCategory },
    ] = getCategoryByName(search);

    let itemData = [];
    if (data && dCategory && !open && !loading) {
        itemData = generateItemData(data.products, dCategory.categoryList);
    }

    React.useEffect(() => {
        if (itemData.length > 0) {
            setItem(itemData);
            if (!close) {
                setOpen(true);
            }
        }
    }, [itemData.length]);

    const startAutocomplete = (e) => {
        setValue(e.target.value);
        const val = e.target.value;
        if (globalTimeout) {
            clearTimeout(globalTimeout);
        }

        globalTimeout = setTimeout(() => {
            setOpen(false);
            setClose(false);
            setSearch(val);
            if (!called) {
                actGetProduct();
                actGetCategory();
            }
        }, 300);
    };

    const handleKeyPress = (e) => {
        handleSearch(e);
    };

    return (
        <Autocomplete
            id="combo-box-demo"
            options={item}
            getOptionLabel={(option) => option.name}
            getOptionSelected={(option, value) => option.name === value.name}
            forcePopupIcon
            style={{ width }}
            openOnFocus={false}
            open={open}
            ListboxProps={{ style: { maxHeight, height: 'auto' } }}
            renderOption={(option) => <OptionsItem {...option} />}
            renderInput={(params) => (
                <TextField
                    id="standard-basic"
                    label="Search..."
                    margin="normal"
                    onBlur={() => {
                        setClose(true);
                        setOpen(false);
                    }}
                    {...params}
                />
            )}
            onInputChange={(e) => startAutocomplete(e)}
            onKeyPress={(e) => handleKeyPress(e)}
            onChange={(e, value) => {
                setOpen(false);
                setClose(true);
                Router.push(
                    '/[...slug]',
                    `/${value.url_key}`,
                );
            }}
            onClose={() => {
                setClose(true);
                setOpen(false);
            }}

        />
    );
}
