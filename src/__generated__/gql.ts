/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "#graphql\n  mutation signUp($input: RegisterCustomerInput!) {\n    registerCustomerAccount(input: $input){\n      ...on Success{\n        success\n      }\n      ...on MissingPasswordError{\n        errorCode\n        message\n      }\n      ...on PasswordValidationError{\n        errorCode\n        message\n        validationErrorMessage\n      }\n      ...on NativeAuthStrategyError{\n        errorCode\n        message\n      }\n    }\n  }\n":
    types.SignUpDocument,
  "#graphql\n  mutation verifyAccount($token: String!) {\n    verifyCustomerAccount(token: $token){\n      ...on CurrentUser{\n        id\n        identifier\n        channels {\n          id\n          token\n          code\n          permissions\n        }\n      }\n      ...on VerificationTokenInvalidError{\n        errorCode\n        message\n      }\n      ...on VerificationTokenExpiredError{\n        errorCode\n        message\n      }\n      ...on NativeAuthStrategyError{\n        errorCode\n        message\n      }\n    }\n  }\n":
    types.VerifyAccountDocument,
  "#graphql\n  mutation logIn($username: String!, $password: String! ) {\n    login(username: $username, password: $password){\n      ...on CurrentUser{\n        id\n        identifier\n      }\n      ...on InvalidCredentialsError{\n        errorCode\n        message\n        authenticationError\n      }\n      ...on NativeAuthStrategyError{\n        errorCode\n        message\n      }\n      ...on NotVerifiedError{\n        errorCode\n        message\n      }\n\n    }\n  }\n":
    types.LogInDocument,
  "#graphql\n  mutation Authenticate($token: String!) {\n      authenticate(input: {\n        google: { token: $token }\n      }) {\n      ...on CurrentUser {\n          id\n          identifier\n      }\n      ...on InvalidCredentialsError{\n        errorCode\n        message\n        authenticationError\n      }\n      ...on NotVerifiedError{\n        errorCode\n        message\n      }\n    }\n  }\n":
    types.AuthenticateDocument,
  "#graphql\n  mutation logOut{\n    logout {\n      success\n    }\n  }\n":
    types.LogOutDocument,
  "#graphql\n  query getAccountInfo{\n    authenticatedUser {\n      title\n      firstName\n      lastName\n      phoneNumber\n      emailAddress\n    }\n  }\n":
    types.GetAccountInfoDocument,
  "#graphql\n  mutation updateAccountInfo($input: UpdateCustomerInput!){\n    updateCustomer(input: $input){\n      title\n      firstName\n      lastName\n      phoneNumber\n      emailAddress\n    }\n  }\n":
    types.UpdateAccountInfoDocument,
  "#graphql\n  mutation createCustomerAddress($input: CreateAddressInput!){\n    createCustomerAddress(input: $input) {\n        id\n    }\n  }\n":
    types.CreateCustomerAddressDocument,
  "#graphql\n  mutation updateCustomerAddress($input: UpdateAddressInput!){\n    updateCustomerAddress(input: $input) {\n        id\n    }\n  }\n":
    types.UpdateCustomerAddressDocument,
  "#graphql\n  mutation deleteCustomerAddress($id: ID!){\n    deleteCustomerAddress(id: $id) {\n        success\n    }\n  }\n":
    types.DeleteCustomerAddressDocument,
  "#graphql\n  query getAddress{\n    authenticatedUser {\n      addresses {\n        id\n        fullName\n        streetLine1\n        streetLine2\n        postalCode\n        city\n        province\n        country {\n          id\n          code\n          name\n        }\n        phoneNumber\n        defaultShippingAddress\n      }\n    }\n  }\n":
    types.GetAddressDocument,
  "#graphql\n  query availableCountries{\n    availableCountries {\n      id\n      name\n      code\n      enabled\n    }\n  }\n":
    types.AvailableCountriesDocument,
  "#graphql\n  query collections($options: CollectionListOptions) {\n    collections(options: $options) {\n      items {\n        id\n        name\n        featuredAsset {\n          source\n        }\n        customFields {\n          Category\n          OnlyFilter\n        }\n      }\n    }\n  }\n":
    types.CollectionsDocument,
  "#graphql\n  query search($input: SearchInput!) {\n    search(input: $input) {\n      items {\n        slug\n        productVariantName\n        priceWithTax{\n          ...on SinglePrice{\n            value\n            }\n        }\n        price{\n          ...on SinglePrice{\n            value\n            }\n        }\n        productAsset {\n          preview\n        }\n      }\n      totalItems\n    }\n  }\n":
    types.SearchDocument,
  "#graphql\n  query newArrival($slug : String) {\n    collection(slug : $slug){\n      id\n      name\n      productVariants {\n        items {\n          name\n          product {\n            slug\n            featuredAsset {\n              preview\n            }\n          }\n        }\n      }\n    }\n  }\n":
    types.NewArrivalDocument,
  "#graphql\n  query heroSection($slug : String) {\n    collection(slug : $slug){\n      id\n      name\n      children {\n        id\n        name\n        assets {\n          name\n          preview\n        }\n      }\n    }\n  }\n":
    types.HeroSectionDocument,
  "#graphql\n  fragment ActiveOrder on Order {\n    id\n    code\n    state\n    couponCodes\n    subTotalWithTax\n    shippingWithTax\n    totalWithTax\n    totalQuantity\n    lines {\n      id\n      productVariant {\n        id\n        name\n        options {\n          name\n          group {\n            name\n          }\n        }\n        customFields {\n          MRP\n        }\n      }\n      featuredAsset {\n        id\n        preview\n      }\n      quantity\n      unitPriceWithTax\n      linePriceWithTax\n      linePrice\n    }\n  }\n":
    types.ActiveOrderFragmentDoc,
  "#graphql\n  mutation AddItemToOrder($productVariantId: ID! $quantity: Int!){\n    addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {\n      ... ActiveOrder\n      ... on ErrorResult {\n        errorCode\n        message\n      }\n    }\n  }\n":
    types.AddItemToOrderDocument,
  "#graphql\n  mutation AdjustOrderLine($orderLineId: ID! $quantity: Int!){\n    adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {\n      ... ActiveOrder\n      ... on ErrorResult {\n        errorCode\n        message\n      }\n    }\n  }\n":
    types.AdjustOrderLineDocument,
  "#graphql\n  query ActiveOrder {\n    activeOrderCustom {\n      ... ActiveOrder\n    }  \n  }\n":
    types.ActiveOrderDocument,
  "#graphql\n  mutation SetShippingAddress($input: CreateAddressInput!){\n    setOrderShippingAddress(input: $input) {\n      ... ActiveOrder\n      ... on ErrorResult {\n        errorCode\n        message\n      }\n    }\n  }\n":
    types.SetShippingAddressDocument,
  "#graphql\n  query GetShippingMethods{\n    eligibleShippingMethods {\n      id\n      name\n      code\n      description\n      priceWithTax\n    }\n  }\n":
    types.GetShippingMethodsDocument,
  "#graphql\n  mutation SetShippingMethod($shippingMethodId: [ID!]!){\n    setOrderShippingMethod(shippingMethodId: $shippingMethodId) {\n      ... ActiveOrder\n      ... on ErrorResult {\n        errorCode\n        message\n      }\n    }\n  }\n":
    types.SetShippingMethodDocument,
  "#graphql\n  query GetPaymentMethods{\n    eligiblePaymentMethods {\n      id\n      name\n      code\n      description\n      isEligible\n      eligibilityMessage\n    }\n  }\n":
    types.GetPaymentMethodsDocument,
  "#graphql\n  mutation TransitionOrder($state: String!){\n    transitionOrderToState(state: $state) {\n      ... ActiveOrder\n      ... on ErrorResult {\n        errorCode\n        message\n      }\n    }\n  }\n":
    types.TransitionOrderDocument,
  "#graphql\n  mutation AddPayment($input: PaymentInput!){\n    addPaymentToOrder(input: $input) {\n      ... ActiveOrder\n      ... on ErrorResult {\n        errorCode\n        message\n      }\n    }\n  }\n":
    types.AddPaymentDocument,
  "#graphql\n  query OrderByCode($code: String!) {\n    orderByCode(code: $code) {\n      ...ActiveOrder\n    }\n  }\n":
    types.OrderByCodeDocument,
  "#graphql\n  mutation generateRazorpayOrderId($vendureOrderId: ID!) {\n    generateRazorpayOrderId(orderId: $vendureOrderId) {\n      __typename\n      ... on RazorpayOrderIdSuccess {\n        razorpayOrderId\n      }\n      ... on RazorpayOrderIdGenerationError {\n        errorCode\n        message\n      }\n    }\n  }\n  ":
    types.GenerateRazorpayOrderIdDocument,
  "#graphql\n  query getOrders{\n    authenticatedUser {\n      orders {\n        items {\n          id\n          totalQuantity\n          totalWithTax\n          orderPlacedAt\n          state\n          lines {\n            featuredAsset {\n              name\n              preview\n            }\n          }    \n        }\n      }\n    }\n  }\n":
    types.GetOrdersDocument,
  "#graphql\n  query OrderById($id: ID!) {\n    order(id: $id) {\n      ...ActiveOrder,\n      shippingAddress {\n        fullName\n        streetLine1\n        streetLine2\n        postalCode\n        city\n        province\n        country\n        phoneNumber\n      }\n      orderPlacedAt\n      payments {\n        method\n      }\n      shippingLines {\n        shippingMethod {\n          name\n        }\n      }\n      invoices {\n        downloadUrl\n      }\n    }\n  }\n":
    types.OrderByIdDocument,
  "#graphql\n  query productDetails($slug: String) {\n    product(slug : $slug){\n      name\n      description\n      collections {\n        name\n      }\n      assets {\n        name\n        preview\n        source\n      }\n      optionGroups {\n        id\n        name\n        options {\n          id\n          name\n        }\n      }\n      variants {\n        id\n        name\n        price\n        priceWithTax\n        sku\n        stockLevel\n        assets {\n          name\n          preview\n          source\n        }\n        options {\n          groupId\n          id\n        }\n        customFields {\n          MRP\n        }\n      }\n      customFields {\n        reviewRating\n        reviewCount\n        Info\n      }\n    }\n  }\n":
    types.ProductDetailsDocument,
  "#graphql\n  query getProductsByCollectionCustom($id: ID, $slug: String, $options: ProductVariantListOptions) {\n    collection(id: $id, slug: $slug) {\n      productVariants(options: $options) {\n        items {\n          name\n          priceWithTax\n          stockLevel\n          customFields {\n            MRP\n          }\n          featuredAsset {\n            preview\n          }\n          product {\n            name\n            slug\n            featuredAsset {\n              preview\n            }\n            customFields {\n              reviewRating\n            }\n          }\n        }\n        totalItems\n      }\n    }\n  }\n":
    types.GetProductsByCollectionCustomDocument,
  "#graphql\n  query getWishList{\n    authenticatedUser {\n      favorites {\n        items {\n          id\n          productVariant {\n            id\n            name\n            priceWithTax\n            product {\n              featuredAsset {\n                name\n                preview\n              }\n            }\n            options {\n              name\n              group {\n                name\n              }\n            }\n            customFields {\n              MRP\n            }\n          }\n        }\n      }\n    }\n  }\n":
    types.GetWishListDocument,
  "#graphql\n  mutation toggleFavorite($productVariantId: ID!){\n    toggleFavorite(productVariantId: $productVariantId) {\n      items {\n        id\n      }\n      totalItems\n    }\n  }\n":
    types.ToggleFavoriteDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "#graphql\n  mutation signUp($input: RegisterCustomerInput!) {\n    registerCustomerAccount(input: $input){\n      ...on Success{\n        success\n      }\n      ...on MissingPasswordError{\n        errorCode\n        message\n      }\n      ...on PasswordValidationError{\n        errorCode\n        message\n        validationErrorMessage\n      }\n      ...on NativeAuthStrategyError{\n        errorCode\n        message\n      }\n    }\n  }\n"
): (typeof documents)["#graphql\n  mutation signUp($input: RegisterCustomerInput!) {\n    registerCustomerAccount(input: $input){\n      ...on Success{\n        success\n      }\n      ...on MissingPasswordError{\n        errorCode\n        message\n      }\n      ...on PasswordValidationError{\n        errorCode\n        message\n        validationErrorMessage\n      }\n      ...on NativeAuthStrategyError{\n        errorCode\n        message\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "#graphql\n  mutation verifyAccount($token: String!) {\n    verifyCustomerAccount(token: $token){\n      ...on CurrentUser{\n        id\n        identifier\n        channels {\n          id\n          token\n          code\n          permissions\n        }\n      }\n      ...on VerificationTokenInvalidError{\n        errorCode\n        message\n      }\n      ...on VerificationTokenExpiredError{\n        errorCode\n        message\n      }\n      ...on NativeAuthStrategyError{\n        errorCode\n        message\n      }\n    }\n  }\n"
): (typeof documents)["#graphql\n  mutation verifyAccount($token: String!) {\n    verifyCustomerAccount(token: $token){\n      ...on CurrentUser{\n        id\n        identifier\n        channels {\n          id\n          token\n          code\n          permissions\n        }\n      }\n      ...on VerificationTokenInvalidError{\n        errorCode\n        message\n      }\n      ...on VerificationTokenExpiredError{\n        errorCode\n        message\n      }\n      ...on NativeAuthStrategyError{\n        errorCode\n        message\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "#graphql\n  mutation logIn($username: String!, $password: String! ) {\n    login(username: $username, password: $password){\n      ...on CurrentUser{\n        id\n        identifier\n      }\n      ...on InvalidCredentialsError{\n        errorCode\n        message\n        authenticationError\n      }\n      ...on NativeAuthStrategyError{\n        errorCode\n        message\n      }\n      ...on NotVerifiedError{\n        errorCode\n        message\n      }\n\n    }\n  }\n"
): (typeof documents)["#graphql\n  mutation logIn($username: String!, $password: String! ) {\n    login(username: $username, password: $password){\n      ...on CurrentUser{\n        id\n        identifier\n      }\n      ...on InvalidCredentialsError{\n        errorCode\n        message\n        authenticationError\n      }\n      ...on NativeAuthStrategyError{\n        errorCode\n        message\n      }\n      ...on NotVerifiedError{\n        errorCode\n        message\n      }\n\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "#graphql\n  mutation Authenticate($token: String!) {\n      authenticate(input: {\n        google: { token: $token }\n      }) {\n      ...on CurrentUser {\n          id\n          identifier\n      }\n      ...on InvalidCredentialsError{\n        errorCode\n        message\n        authenticationError\n      }\n      ...on NotVerifiedError{\n        errorCode\n        message\n      }\n    }\n  }\n"
): (typeof documents)["#graphql\n  mutation Authenticate($token: String!) {\n      authenticate(input: {\n        google: { token: $token }\n      }) {\n      ...on CurrentUser {\n          id\n          identifier\n      }\n      ...on InvalidCredentialsError{\n        errorCode\n        message\n        authenticationError\n      }\n      ...on NotVerifiedError{\n        errorCode\n        message\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "#graphql\n  mutation logOut{\n    logout {\n      success\n    }\n  }\n"
): (typeof documents)["#graphql\n  mutation logOut{\n    logout {\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "#graphql\n  query getAccountInfo{\n    authenticatedUser {\n      title\n      firstName\n      lastName\n      phoneNumber\n      emailAddress\n    }\n  }\n"
): (typeof documents)["#graphql\n  query getAccountInfo{\n    authenticatedUser {\n      title\n      firstName\n      lastName\n      phoneNumber\n      emailAddress\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "#graphql\n  mutation updateAccountInfo($input: UpdateCustomerInput!){\n    updateCustomer(input: $input){\n      title\n      firstName\n      lastName\n      phoneNumber\n      emailAddress\n    }\n  }\n"
): (typeof documents)["#graphql\n  mutation updateAccountInfo($input: UpdateCustomerInput!){\n    updateCustomer(input: $input){\n      title\n      firstName\n      lastName\n      phoneNumber\n      emailAddress\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "#graphql\n  mutation createCustomerAddress($input: CreateAddressInput!){\n    createCustomerAddress(input: $input) {\n        id\n    }\n  }\n"
): (typeof documents)["#graphql\n  mutation createCustomerAddress($input: CreateAddressInput!){\n    createCustomerAddress(input: $input) {\n        id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "#graphql\n  mutation updateCustomerAddress($input: UpdateAddressInput!){\n    updateCustomerAddress(input: $input) {\n        id\n    }\n  }\n"
): (typeof documents)["#graphql\n  mutation updateCustomerAddress($input: UpdateAddressInput!){\n    updateCustomerAddress(input: $input) {\n        id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "#graphql\n  mutation deleteCustomerAddress($id: ID!){\n    deleteCustomerAddress(id: $id) {\n        success\n    }\n  }\n"
): (typeof documents)["#graphql\n  mutation deleteCustomerAddress($id: ID!){\n    deleteCustomerAddress(id: $id) {\n        success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "#graphql\n  query getAddress{\n    authenticatedUser {\n      addresses {\n        id\n        fullName\n        streetLine1\n        streetLine2\n        postalCode\n        city\n        province\n        country {\n          id\n          code\n          name\n        }\n        phoneNumber\n        defaultShippingAddress\n      }\n    }\n  }\n"
): (typeof documents)["#graphql\n  query getAddress{\n    authenticatedUser {\n      addresses {\n        id\n        fullName\n        streetLine1\n        streetLine2\n        postalCode\n        city\n        province\n        country {\n          id\n          code\n          name\n        }\n        phoneNumber\n        defaultShippingAddress\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "#graphql\n  query availableCountries{\n    availableCountries {\n      id\n      name\n      code\n      enabled\n    }\n  }\n"
): (typeof documents)["#graphql\n  query availableCountries{\n    availableCountries {\n      id\n      name\n      code\n      enabled\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "#graphql\n  query collections($options: CollectionListOptions) {\n    collections(options: $options) {\n      items {\n        id\n        name\n        featuredAsset {\n          source\n        }\n        customFields {\n          Category\n          OnlyFilter\n        }\n      }\n    }\n  }\n"
): (typeof documents)["#graphql\n  query collections($options: CollectionListOptions) {\n    collections(options: $options) {\n      items {\n        id\n        name\n        featuredAsset {\n          source\n        }\n        customFields {\n          Category\n          OnlyFilter\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "#graphql\n  query search($input: SearchInput!) {\n    search(input: $input) {\n      items {\n        slug\n        productVariantName\n        priceWithTax{\n          ...on SinglePrice{\n            value\n            }\n        }\n        price{\n          ...on SinglePrice{\n            value\n            }\n        }\n        productAsset {\n          preview\n        }\n      }\n      totalItems\n    }\n  }\n"
): (typeof documents)["#graphql\n  query search($input: SearchInput!) {\n    search(input: $input) {\n      items {\n        slug\n        productVariantName\n        priceWithTax{\n          ...on SinglePrice{\n            value\n            }\n        }\n        price{\n          ...on SinglePrice{\n            value\n            }\n        }\n        productAsset {\n          preview\n        }\n      }\n      totalItems\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "#graphql\n  query newArrival($slug : String) {\n    collection(slug : $slug){\n      id\n      name\n      productVariants {\n        items {\n          name\n          product {\n            slug\n            featuredAsset {\n              preview\n            }\n          }\n        }\n      }\n    }\n  }\n"
): (typeof documents)["#graphql\n  query newArrival($slug : String) {\n    collection(slug : $slug){\n      id\n      name\n      productVariants {\n        items {\n          name\n          product {\n            slug\n            featuredAsset {\n              preview\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "#graphql\n  query heroSection($slug : String) {\n    collection(slug : $slug){\n      id\n      name\n      children {\n        id\n        name\n        assets {\n          name\n          preview\n        }\n      }\n    }\n  }\n"
): (typeof documents)["#graphql\n  query heroSection($slug : String) {\n    collection(slug : $slug){\n      id\n      name\n      children {\n        id\n        name\n        assets {\n          name\n          preview\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "#graphql\n  fragment ActiveOrder on Order {\n    id\n    code\n    state\n    couponCodes\n    subTotalWithTax\n    shippingWithTax\n    totalWithTax\n    totalQuantity\n    lines {\n      id\n      productVariant {\n        id\n        name\n        options {\n          name\n          group {\n            name\n          }\n        }\n        customFields {\n          MRP\n        }\n      }\n      featuredAsset {\n        id\n        preview\n      }\n      quantity\n      unitPriceWithTax\n      linePriceWithTax\n      linePrice\n    }\n  }\n"
): (typeof documents)["#graphql\n  fragment ActiveOrder on Order {\n    id\n    code\n    state\n    couponCodes\n    subTotalWithTax\n    shippingWithTax\n    totalWithTax\n    totalQuantity\n    lines {\n      id\n      productVariant {\n        id\n        name\n        options {\n          name\n          group {\n            name\n          }\n        }\n        customFields {\n          MRP\n        }\n      }\n      featuredAsset {\n        id\n        preview\n      }\n      quantity\n      unitPriceWithTax\n      linePriceWithTax\n      linePrice\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "#graphql\n  mutation AddItemToOrder($productVariantId: ID! $quantity: Int!){\n    addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {\n      ... ActiveOrder\n      ... on ErrorResult {\n        errorCode\n        message\n      }\n    }\n  }\n"
): (typeof documents)["#graphql\n  mutation AddItemToOrder($productVariantId: ID! $quantity: Int!){\n    addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {\n      ... ActiveOrder\n      ... on ErrorResult {\n        errorCode\n        message\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "#graphql\n  mutation AdjustOrderLine($orderLineId: ID! $quantity: Int!){\n    adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {\n      ... ActiveOrder\n      ... on ErrorResult {\n        errorCode\n        message\n      }\n    }\n  }\n"
): (typeof documents)["#graphql\n  mutation AdjustOrderLine($orderLineId: ID! $quantity: Int!){\n    adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {\n      ... ActiveOrder\n      ... on ErrorResult {\n        errorCode\n        message\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "#graphql\n  query ActiveOrder {\n    activeOrderCustom {\n      ... ActiveOrder\n    }  \n  }\n"
): (typeof documents)["#graphql\n  query ActiveOrder {\n    activeOrderCustom {\n      ... ActiveOrder\n    }  \n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "#graphql\n  mutation SetShippingAddress($input: CreateAddressInput!){\n    setOrderShippingAddress(input: $input) {\n      ... ActiveOrder\n      ... on ErrorResult {\n        errorCode\n        message\n      }\n    }\n  }\n"
): (typeof documents)["#graphql\n  mutation SetShippingAddress($input: CreateAddressInput!){\n    setOrderShippingAddress(input: $input) {\n      ... ActiveOrder\n      ... on ErrorResult {\n        errorCode\n        message\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "#graphql\n  query GetShippingMethods{\n    eligibleShippingMethods {\n      id\n      name\n      code\n      description\n      priceWithTax\n    }\n  }\n"
): (typeof documents)["#graphql\n  query GetShippingMethods{\n    eligibleShippingMethods {\n      id\n      name\n      code\n      description\n      priceWithTax\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "#graphql\n  mutation SetShippingMethod($shippingMethodId: [ID!]!){\n    setOrderShippingMethod(shippingMethodId: $shippingMethodId) {\n      ... ActiveOrder\n      ... on ErrorResult {\n        errorCode\n        message\n      }\n    }\n  }\n"
): (typeof documents)["#graphql\n  mutation SetShippingMethod($shippingMethodId: [ID!]!){\n    setOrderShippingMethod(shippingMethodId: $shippingMethodId) {\n      ... ActiveOrder\n      ... on ErrorResult {\n        errorCode\n        message\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "#graphql\n  query GetPaymentMethods{\n    eligiblePaymentMethods {\n      id\n      name\n      code\n      description\n      isEligible\n      eligibilityMessage\n    }\n  }\n"
): (typeof documents)["#graphql\n  query GetPaymentMethods{\n    eligiblePaymentMethods {\n      id\n      name\n      code\n      description\n      isEligible\n      eligibilityMessage\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "#graphql\n  mutation TransitionOrder($state: String!){\n    transitionOrderToState(state: $state) {\n      ... ActiveOrder\n      ... on ErrorResult {\n        errorCode\n        message\n      }\n    }\n  }\n"
): (typeof documents)["#graphql\n  mutation TransitionOrder($state: String!){\n    transitionOrderToState(state: $state) {\n      ... ActiveOrder\n      ... on ErrorResult {\n        errorCode\n        message\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "#graphql\n  mutation AddPayment($input: PaymentInput!){\n    addPaymentToOrder(input: $input) {\n      ... ActiveOrder\n      ... on ErrorResult {\n        errorCode\n        message\n      }\n    }\n  }\n"
): (typeof documents)["#graphql\n  mutation AddPayment($input: PaymentInput!){\n    addPaymentToOrder(input: $input) {\n      ... ActiveOrder\n      ... on ErrorResult {\n        errorCode\n        message\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "#graphql\n  query OrderByCode($code: String!) {\n    orderByCode(code: $code) {\n      ...ActiveOrder\n    }\n  }\n"
): (typeof documents)["#graphql\n  query OrderByCode($code: String!) {\n    orderByCode(code: $code) {\n      ...ActiveOrder\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "#graphql\n  mutation generateRazorpayOrderId($vendureOrderId: ID!) {\n    generateRazorpayOrderId(orderId: $vendureOrderId) {\n      __typename\n      ... on RazorpayOrderIdSuccess {\n        razorpayOrderId\n      }\n      ... on RazorpayOrderIdGenerationError {\n        errorCode\n        message\n      }\n    }\n  }\n  "
): (typeof documents)["#graphql\n  mutation generateRazorpayOrderId($vendureOrderId: ID!) {\n    generateRazorpayOrderId(orderId: $vendureOrderId) {\n      __typename\n      ... on RazorpayOrderIdSuccess {\n        razorpayOrderId\n      }\n      ... on RazorpayOrderIdGenerationError {\n        errorCode\n        message\n      }\n    }\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "#graphql\n  query getOrders{\n    authenticatedUser {\n      orders {\n        items {\n          id\n          totalQuantity\n          totalWithTax\n          orderPlacedAt\n          state\n          lines {\n            featuredAsset {\n              name\n              preview\n            }\n          }    \n        }\n      }\n    }\n  }\n"
): (typeof documents)["#graphql\n  query getOrders{\n    authenticatedUser {\n      orders {\n        items {\n          id\n          totalQuantity\n          totalWithTax\n          orderPlacedAt\n          state\n          lines {\n            featuredAsset {\n              name\n              preview\n            }\n          }    \n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "#graphql\n  query OrderById($id: ID!) {\n    order(id: $id) {\n      ...ActiveOrder,\n      shippingAddress {\n        fullName\n        streetLine1\n        streetLine2\n        postalCode\n        city\n        province\n        country\n        phoneNumber\n      }\n      orderPlacedAt\n      payments {\n        method\n      }\n      shippingLines {\n        shippingMethod {\n          name\n        }\n      }\n      invoices {\n        downloadUrl\n      }\n    }\n  }\n"
): (typeof documents)["#graphql\n  query OrderById($id: ID!) {\n    order(id: $id) {\n      ...ActiveOrder,\n      shippingAddress {\n        fullName\n        streetLine1\n        streetLine2\n        postalCode\n        city\n        province\n        country\n        phoneNumber\n      }\n      orderPlacedAt\n      payments {\n        method\n      }\n      shippingLines {\n        shippingMethod {\n          name\n        }\n      }\n      invoices {\n        downloadUrl\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "#graphql\n  query productDetails($slug: String) {\n    product(slug : $slug){\n      name\n      description\n      collections {\n        name\n      }\n      assets {\n        name\n        preview\n        source\n      }\n      optionGroups {\n        id\n        name\n        options {\n          id\n          name\n        }\n      }\n      variants {\n        id\n        name\n        price\n        priceWithTax\n        sku\n        stockLevel\n        assets {\n          name\n          preview\n          source\n        }\n        options {\n          groupId\n          id\n        }\n        customFields {\n          MRP\n        }\n      }\n      customFields {\n        reviewRating\n        reviewCount\n        Info\n      }\n    }\n  }\n"
): (typeof documents)["#graphql\n  query productDetails($slug: String) {\n    product(slug : $slug){\n      name\n      description\n      collections {\n        name\n      }\n      assets {\n        name\n        preview\n        source\n      }\n      optionGroups {\n        id\n        name\n        options {\n          id\n          name\n        }\n      }\n      variants {\n        id\n        name\n        price\n        priceWithTax\n        sku\n        stockLevel\n        assets {\n          name\n          preview\n          source\n        }\n        options {\n          groupId\n          id\n        }\n        customFields {\n          MRP\n        }\n      }\n      customFields {\n        reviewRating\n        reviewCount\n        Info\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "#graphql\n  query getProductsByCollectionCustom($id: ID, $slug: String, $options: ProductVariantListOptions) {\n    collection(id: $id, slug: $slug) {\n      productVariants(options: $options) {\n        items {\n          name\n          priceWithTax\n          stockLevel\n          customFields {\n            MRP\n          }\n          featuredAsset {\n            preview\n          }\n          product {\n            name\n            slug\n            featuredAsset {\n              preview\n            }\n            customFields {\n              reviewRating\n            }\n          }\n        }\n        totalItems\n      }\n    }\n  }\n"
): (typeof documents)["#graphql\n  query getProductsByCollectionCustom($id: ID, $slug: String, $options: ProductVariantListOptions) {\n    collection(id: $id, slug: $slug) {\n      productVariants(options: $options) {\n        items {\n          name\n          priceWithTax\n          stockLevel\n          customFields {\n            MRP\n          }\n          featuredAsset {\n            preview\n          }\n          product {\n            name\n            slug\n            featuredAsset {\n              preview\n            }\n            customFields {\n              reviewRating\n            }\n          }\n        }\n        totalItems\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "#graphql\n  query getWishList{\n    authenticatedUser {\n      favorites {\n        items {\n          id\n          productVariant {\n            id\n            name\n            priceWithTax\n            product {\n              featuredAsset {\n                name\n                preview\n              }\n            }\n            options {\n              name\n              group {\n                name\n              }\n            }\n            customFields {\n              MRP\n            }\n          }\n        }\n      }\n    }\n  }\n"
): (typeof documents)["#graphql\n  query getWishList{\n    authenticatedUser {\n      favorites {\n        items {\n          id\n          productVariant {\n            id\n            name\n            priceWithTax\n            product {\n              featuredAsset {\n                name\n                preview\n              }\n            }\n            options {\n              name\n              group {\n                name\n              }\n            }\n            customFields {\n              MRP\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "#graphql\n  mutation toggleFavorite($productVariantId: ID!){\n    toggleFavorite(productVariantId: $productVariantId) {\n      items {\n        id\n      }\n      totalItems\n    }\n  }\n"
): (typeof documents)["#graphql\n  mutation toggleFavorite($productVariantId: ID!){\n    toggleFavorite(productVariantId: $productVariantId) {\n      items {\n        id\n      }\n      totalItems\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
