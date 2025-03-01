import { AUTH_RETRY_LIMIT, JWT_REVOKE_INTERVAL } from './constants';
import { MissingError, RetriesError } from './errors';
import { TDAuthResponse, TDResponse } from './types/response';

class DAuth {
  private readonly endpoint: string;
  private readonly retryLimit: number;

  private token: string = '';
  private jwt: string = '';

  private revokeTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(endpoint: string, retryLimit: number = AUTH_RETRY_LIMIT) {
    if (!endpoint) {
      throw new MissingError('"endpoint"');
    }

    this.endpoint = endpoint;
    this.retryLimit = retryLimit;
  };

  public readonly getJWT = async (token: string): Promise<string> => {
    if (this.jwt) {
      return this.jwt;
    }

    return this.auth(token);
  }

  public readonly auth = async (token: string, tryCounter: number = 0): Promise<string> => {
    if (!token) {
      throw new MissingError('"token"');
    }

    this.logout();

    try {
      const response = await fetch(`${this.endpoint}/${token}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const { response: { accessToken } } = await response.json() as TDResponse<TDAuthResponse>;

      this.token = token;
      this.jwt = accessToken;
      this.revokeTimeout = setTimeout(() => {
        this.revoke();
      }, JWT_REVOKE_INTERVAL);
    } catch (error) {
      console.error('[DAuth:] Failed to fetch JWT token:', error);
      if (tryCounter < this.retryLimit) {
        const retry = tryCounter + 1;
        console.error(`[DAuth:] ${retry} retry...`);

        return this.auth(token, retry);
      } else {
        throw new RetriesError(error);
      }
    }

    return this.jwt;
  };

  public readonly revoke = (token?: string) => {
    return this.auth(token || this.token);
  };

  public readonly logout = () => {
    this.jwt = '';

    if (!this.revokeTimeout) return;

    clearTimeout(this.revokeTimeout);
    this.revokeTimeout = null;
  };
}

export default DAuth;
