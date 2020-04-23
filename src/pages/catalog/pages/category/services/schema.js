/* eslint-disable import/prefer-default-export */

import { gql } from 'apollo-boost';


/**
 * generate dynamic filter query
 * @param catId number
 * @param filter array of filter value
 * @returns string query to generate on grapql tag
 */
const filterProduct = (catID, filter) => {
    let queryFilter = `{ category_id: { eq: "${catID}" }`;
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < filter.length; index++) {
        const detailFilter = filter[index];
        if (detailFilter.type === 'price') {
            queryFilter += `
          ,${detailFilter.type} : {
            from: "${detailFilter.from}"
            to: "${detailFilter.to}"
          }
        `;
        }
    }
    queryFilter += '}';
    return queryFilter;
};

/**
 * scema dynamic category
 * @param catId number
 * @param config Object {pageSize: number, currentPage: Number}
 * @returns grapql query
 */

export const getProductByCategory = (catID, config = {}) => gql`
    {
      products( filter: ${filterProduct(catID, config.filter)}, pageSize: ${
    config.pageSize ? config.pageSize : 20
},
      currentPage: ${config.currentPage ? config.currentPage : 1}
      ${
    config.sort
        ? `, sort: {${config.sort.key} : ${config.sort.value}}`
        : ''
}
      ) {
        total_count
        __typename
        items {
          id
          name
          url_key
          image {
            url
            label
          }
          __typename
          price_tiers {
            discount {
              percent_off
              amount_off
            }
            final_price {
              currency
              value
            }
            quantity
          }
          price_range {
            maximum_price {
              discount{
                amount_off
                percent_off
              }
              final_price {
                currency
                value
              }
              regular_price {
                currency
                value
              }
            }
            minimum_price {
              discount{
                amount_off
                percent_off
              }
              final_price {
                currency
                value
              }
              regular_price {
                currency
                value
              }
            }
          }
          ... on ConfigurableProduct {
            variants {
              attributes {
                code
                label
                value_index
              }
              product{
                image {
                  url
                  label
                }
              }
            }
          }
        }
      }
    }
  `;

/**
 * scema dynamic category
 * @param variables Object {id: number, productSize: Number}
 * @returns grapql query
 */

export const getCategory = (
    variables = {
        productSize: 20,
    },
) => gql`
    {
        categoryList(filters: { ids: { eq: "${variables.id}" } }) {
          id
          name
          url_path
          image
          children {
            id
            name
            image
            url_path
          }
        }
    }
    `;

/**
 * scema dynamic get attribute filter
 * @param category_id number
 * @returns grapql query
 */

export const getFilter = (catID) => gql`
    {
        getFilterAttributeOptions (catid:${catID}) {
            code
            data {
                field
                id
                label
                maxprice
                minprice
                value {
                    label
                    value
                }
            }
            message
            status
        }
    }
`;