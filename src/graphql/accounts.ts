import { gql } from "@/__generated__";

export const SIGN_UP = gql(`#graphql
  mutation signUp($input: RegisterCustomerInput!) {
    registerCustomerAccount(input: $input){
      ...on Success{
        success
      }
      ...on MissingPasswordError{
        errorCode
        message
      }
      ...on PasswordValidationError{
        errorCode
        message
        validationErrorMessage
      }
      ...on NativeAuthStrategyError{
        errorCode
        message
      }
    }
  }
`);

export const VERIFY_ACCOUNT = gql(`#graphql
  mutation verifyAccount($token: String!) {
    verifyCustomerAccount(token: $token){
      ...on CurrentUser{
        id
        identifier
        channels {
          id
          token
          code
          permissions
        }
      }
      ...on VerificationTokenInvalidError{
        errorCode
        message
      }
      ...on VerificationTokenExpiredError{
        errorCode
        message
      }
      ...on NativeAuthStrategyError{
        errorCode
        message
      }
    }
  }
`);

export const LOG_IN = gql(`#graphql
  mutation logIn($username: String!, $password: String! ) {
    login(username: $username, password: $password){
      ...on CurrentUser{
        id
        identifier
      }
      ...on InvalidCredentialsError{
        errorCode
        message
        authenticationError
      }
      ...on NativeAuthStrategyError{
        errorCode
        message
      }
      ...on NotVerifiedError{
        errorCode
        message
      }

    }
  }
`);

export const LOG_OUT = gql(`#graphql
  mutation logOut{
    logout {
      success
    }
  }
`);
