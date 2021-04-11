import PopularPage from './components/'
import gqlService from '../../services/graphql';

const Popular = (props) => {
    const { error, loading, data} = gqlService.getProduct();
    // console.log(data)
    return (
        <PopularPage
            error={error}
            loading={loading}
            data={data}
        />
    )
};

export default Popular;
