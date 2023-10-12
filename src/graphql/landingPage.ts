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
          OnlyFilter
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

export const NEW_ARRIVAL = gql(`#graphql
  query newArrival($slug : String) {
    collection(slug : $slug){
      id
      name
      productVariants {
        items {
          name
          product {
            slug
            featuredAsset {
              preview
            }
          }
        }
      }
    }
  }
`);

export const HERO_SECTION = gql(`#graphql
  query heroSection($slug : String) {
    collection(slug : $slug){
      id
      name
      children {
        id
        name
        featuredAsset {
          name
          preview
        }
      }
    }
  }
`);
