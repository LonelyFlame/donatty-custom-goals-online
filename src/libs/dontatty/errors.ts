import { BASE_URI } from './constants';

export class TypeError extends Error {
  constructor(providedType: string, expectedType: string) {
    super(`Invalid widget type. Ref of "${providedType}" widget provided, "${expectedType}" expected`);
  }
}

export class MissingError extends Error {
  constructor(missing: string) {
    super(`Missing attributes. ${missing} should be specified`);
  }
}

export class RetriesError extends Error {
  constructor(cause?: unknown) {
    super('Out of retries, exit.', { cause });
  }
}

export class FetchError extends Error {
  constructor(cause?: unknown) {
    super('Failed to fetch data.', { cause });
  }
}

export class OriginError extends Error {
  constructor(provided?: unknown) {
    super(`Wrong widgets service provided. Only ${BASE_URI} supported, ${provided} provided`);
  }
}

export class TokensError extends Error {
  constructor() {
    super(`The embed widget link should contain "token" and "ref" search params`);
  }
}
