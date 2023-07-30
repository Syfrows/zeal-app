import { gql } from "@/__generated__";

export const PRODUCTS_BY_COLLECTION = gql(`#graphql
  query getProductsByCollection($id: ID, $slug: String, $options: ProductVariantListOptions) {
    collection(id: $id, slug: $slug) {
      productVariants(options: $options) {
        items {
          name
          priceWithTax
          customFields {
            MRP
          }
          featuredAsset {
            preview
          }
          product {
            slug
            featuredAsset {
              preview
            }
            customFields {
              reviewRating
            }
          }
        }
        totalItems
      }
    }
  }
`);
