import { gql } from "@/__generated__";

export const COLLECTIONS = gql(`#graphql
  query collections($options: CollectionListOptions) {
    collections(options: $options) {
      items {
        id
        name
        featuredAsset {
          source
        }
        customFields {
          Category
        }
      }
    }
  }
`);

export const SEARCH = gql(`#graphql
  query search($input: SearchInput!) {
    search(input: $input) {
      items {
        slug
        productVariantName
        priceWithTax{
          ...on SinglePrice{
            value
            }
        }
        price{
          ...on SinglePrice{
            value
            }
        }
        productAsset {
          preview
        }
      }
      totalItems
    }
  }
`);
