import { gql } from "@/__generated__/gql";

export const GET_WISHLIST = gql(`#graphql
  query getWishList{
    authenticatedUser {
      favorites {
        items {
          id
          productVariant {
            id
            name
            priceWithTax
            product {
              featuredAsset {
                name
                preview
              }
            }
            options {
              name
              group {
                name
              }
            }
            customFields {
              MRP
            }
          }
        }
      }
    }
  }
`);

export const TOGGLE_WISHLIST = gql(`#graphql
  mutation toggleFavorite($productVariantId: ID!){
    toggleFavorite(productVariantId: $productVariantId) {
      items {
        id
      }
      totalItems
    }
  }
`);
