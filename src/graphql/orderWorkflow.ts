import { gql } from "@/__generated__/gql";

export const ACTIVE_ORDER_FRAGMENT = gql(`#graphql
  fragment ActiveOrder on Order {
    id
    code
    state
    couponCodes
    subTotalWithTax
    shippingWithTax
    totalWithTax
    totalQuantity
    lines {
      id
      productVariant {
        id
        name
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
      featuredAsset {
        id
        preview
      }
      quantity
      unitPriceWithTax
      linePriceWithTax
      linePrice
    }
  }
`);

export const ADD_ITEM_TO_ORDER = gql(`#graphql
  mutation AddItemToOrder($productVariantId: ID! $quantity: Int!){
    addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {
      ... ActiveOrder
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`);

export const ADJUST_ORDER_LINE = gql(`#graphql
  mutation AdjustOrderLine($orderLineId: ID! $quantity: Int!){
    adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {
      ... ActiveOrder
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`);

export const ACTIVE_ORDER = gql(`#graphql
  query ActiveOrder {
    activeOrder {
      ... ActiveOrder
    }  
  }
`);

export const SET_SHIPPING_ADDRESS = gql(`#graphql
  mutation SetShippingAddress($input: CreateAddressInput!){
    setOrderShippingAddress(input: $input) {
      ... ActiveOrder
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`);

export const GET_SHIPPING_METHODS = gql(`#graphql
  query GetShippingMethods{
    eligibleShippingMethods {
      id
      name
      code
      description
      priceWithTax
    }
  }
`);

export const SET_SHIPPING_METHOD = gql(`#graphql
  mutation SetShippingMethod($shippingMethodId: [ID!]!){
    setOrderShippingMethod(shippingMethodId: $shippingMethodId) {
      ... ActiveOrder
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`);

export const GET_PAYMENT_METHODS = gql(`#graphql
  query GetPaymentMethods{
    eligiblePaymentMethods {
      id
      name
      code
      description
      isEligible
      eligibilityMessage
    }
  }
`);

export const TRANSITION_ORDER = gql(`#graphql
  mutation TransitionOrder($state: String!){
    transitionOrderToState(state: $state) {
      ... ActiveOrder
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`);

export const ADD_PAYMENT = gql(`#graphql
  mutation AddPayment($input: PaymentInput!){
    addPaymentToOrder(input: $input) {
      ... ActiveOrder
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`);

export const ORDER_BY_CODE = gql(`#graphql
  query OrderByCode($code: String!) {
    orderByCode(code: $code) {
      ...ActiveOrder
    }
  }
`);

export const GENERATE_RAZORPAY_ORDER_ID = gql(`#graphql
  mutation generateRazorpayOrderId($vendureOrderId: ID!) {
    generateRazorpayOrderId(orderId: $vendureOrderId) {
      __typename
      ... on RazorpayOrderIdSuccess {
        razorpayOrderId
      }
      ... on RazorpayOrderIdGenerationError {
        errorCode
        message
      }
    }
  }
  `);
