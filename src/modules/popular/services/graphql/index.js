import { useQuery } from '@apollo/client';
import  productQuery from './schema';

const getProduct = () => useQuery(productQuery);

export default { getProduct};
