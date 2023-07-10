import { gql } from "@/__generated__/gql";

export const GET_ORDERS = gql(`#graphql
  query getOrders{
    activeCustomer {
      orders {
        items {
          id
          totalQuantity
          totalWithTax
          orderPlacedAt
          state
          lines {
            featuredAsset {
              name
              preview
            }
          }    
        }
      }
    }
  }
`);

export const ORDER_BY_ID = gql(`#graphql
  query OrderById($id: ID!) {
    order(id: $id) {
      ...ActiveOrder,
      shippingAddress {
        fullName
        streetLine1
        streetLine2
        postalCode
        city
        province
        country
        phoneNumber
      }
      orderPlacedAt
      payments {
        method
      }
      shippingLines {
        shippingMethod {
          name
        }
      }
    }
  }
`);
