export const isPgError = (error: unknown): error is { code: string } => {
  return typeof error === "object" && error !== null && "code" in error;
};
