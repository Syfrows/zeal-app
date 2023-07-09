import { gql } from "@/__generated__";

export const CREATE_CUSTOMER_ADDRESS = gql(`#graphql
  mutation createCustomerAddress($input: CreateAddressInput!){
    createCustomerAddress(input: $input) {
        id
    }
  }
`);

export const GET_ADDRESS = gql(`#graphql
  query getAddress{
    activeCustomer {
      addresses {
        id
        fullName
        streetLine1
        streetLine2
        postalCode
        city
        province
        country {
          id
          code
          name
        }
        phoneNumber
        defaultShippingAddress
      }
    }
  }
`);

export const AVAILABLE_COUNTRIES = gql(`#graphql
  query availableCountries{
    availableCountries {
      id
      name
      code
      enabled
    }
  }
`);
