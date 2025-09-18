export const REQUIRED_AUTH_FIELDS = {
  //auth
  ERROR_MESSAGE_METHOD_NOT_SUPPORTED: "This request method is not supported.",

  // auth
  USER_NOT_FOUND: "User not found!",
  // auth
  EMAIL_PASSWORD_MISSING:
    "Bad request, email or password parameter is missing in POST request.",
  
  // auth
  USER_CREATED: "User created!",

      // auth
  ACCOUNT_DELETED: "Account deleted!",
  // auth
  USER_UPDATED: "User updated!",
} as const;