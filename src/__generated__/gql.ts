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
  "#graphql\n  query collections($options: CollectionListOptions) {\n    collections(options: $options) {\n      items {\n        id\n        name\n        featuredAsset {\n          source\n        }\n      }\n    }\n  }\n":
    types.CollectionsDocument,
  "#graphql\n  query search($input: SearchInput!) {\n    search(input: $input) {\n      items {\n        slug\n        productVariantName\n        priceWithTax{\n          ...on SinglePrice{\n            value\n            }\n        }\n        price{\n          ...on SinglePrice{\n            value\n            }\n        }\n        productAsset {\n          preview\n        }\n      }\n      totalItems\n    }\n  }\n":
    types.SearchDocument,
  "#graphql\n  query productDetails($slug: String) {\n    product(slug : $slug){\n      name\n      description\n      collections {\n        name\n      }\n      assets {\n        name\n        preview\n        source\n      }\n      optionGroups {\n        id\n        name\n        options {\n          id\n          name\n        }\n      }\n      variants {\n        name\n        price\n        priceWithTax\n        sku\n        stockLevel\n        assets {\n          name\n          preview\n          source\n        }\n        options {\n          groupId\n          id\n        }\n      }\n      customFields {\n        reviewRating\n        reviewCount\n      }\n    }\n  }\n":
    types.ProductDetailsDocument,
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
  source: "#graphql\n  query collections($options: CollectionListOptions) {\n    collections(options: $options) {\n      items {\n        id\n        name\n        featuredAsset {\n          source\n        }\n      }\n    }\n  }\n"
): (typeof documents)["#graphql\n  query collections($options: CollectionListOptions) {\n    collections(options: $options) {\n      items {\n        id\n        name\n        featuredAsset {\n          source\n        }\n      }\n    }\n  }\n"];
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
  source: "#graphql\n  query productDetails($slug: String) {\n    product(slug : $slug){\n      name\n      description\n      collections {\n        name\n      }\n      assets {\n        name\n        preview\n        source\n      }\n      optionGroups {\n        id\n        name\n        options {\n          id\n          name\n        }\n      }\n      variants {\n        name\n        price\n        priceWithTax\n        sku\n        stockLevel\n        assets {\n          name\n          preview\n          source\n        }\n        options {\n          groupId\n          id\n        }\n      }\n      customFields {\n        reviewRating\n        reviewCount\n      }\n    }\n  }\n"
): (typeof documents)["#graphql\n  query productDetails($slug: String) {\n    product(slug : $slug){\n      name\n      description\n      collections {\n        name\n      }\n      assets {\n        name\n        preview\n        source\n      }\n      optionGroups {\n        id\n        name\n        options {\n          id\n          name\n        }\n      }\n      variants {\n        name\n        price\n        priceWithTax\n        sku\n        stockLevel\n        assets {\n          name\n          preview\n          source\n        }\n        options {\n          groupId\n          id\n        }\n      }\n      customFields {\n        reviewRating\n        reviewCount\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
