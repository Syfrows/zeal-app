import { gql } from "@/__generated__";

export const PRODUCT_DETAILS = gql(`#graphql
  query productDetails($slug: String) {
    product(slug : $slug){
      name
      description
      collections {
        name
      }
      assets {
        name
        preview
        source
      }
      optionGroups {
        id
        name
        options {
          id
          name
        }
      }
      variants {
        id
        name
        price
        priceWithTax
        sku
        stockLevel
        assets {
          name
          preview
          source
        }
        options {
          groupId
          id
        }
        customFields {
          MRP
        }
      }
      customFields {
        reviewRating
        reviewCount
        Info
      }
    }
  }
`);
