export class NotAuthenticatedError extends Error {
  name = "NotAuthenticatedError" as const
}
export class ChatNotFoundOrForbiddenError extends Error {
  name = "ChatNotFoundOrForbiddenError" as const
}
