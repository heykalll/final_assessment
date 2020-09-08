import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import { useTranslation } from '@i18n';

const SearchBox = React.forwardRef((props, ref) => {
    const { t } = useTranslation(['common']);
    return (
        <StandaloneSearchBox
            ref={ref}
            onPlacesChanged={props.handleSearch}
        >
            <TextField
                fullWidth
                placeholder={t('common:search:location')}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon color="secondary" />
                        </InputAdornment>
                    ),
                }}
            />
        </StandaloneSearchBox>
    );
});

export default SearchBox;
