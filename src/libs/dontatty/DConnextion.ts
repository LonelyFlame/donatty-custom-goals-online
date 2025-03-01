import DAuth from './DAuth';
import { FetchError, MissingError } from './errors';
import { fmtApiUri } from './utils';
import type { TDResponse, TDWidgetsResponse } from './types/response';

class DConnection<Response extends TDWidgetsResponse = TDWidgetsResponse> {
  private readonly refToken: string;
  private readonly authToken: string;
  private readonly endpoint: string;

  private readonly zoneOffset: number = (new Date).getTimezoneOffset();

  private auth: DAuth;

  constructor(refToken: string, authToken: string) {
    if (!refToken || !authToken) {
      throw new MissingError('Both "authToken" and "refToken"');
    }

    this.endpoint = fmtApiUri(refToken);
    this.refToken = refToken;
    this.authToken = authToken;

    this.auth = new DAuth(this.authEndpoint);
  }

  get authEndpoint(): string {
    return `${this.endpoint}/auth/tokens`;
  }
  get widgetsEndpoint(): string {
    return `${this.endpoint}/widgets/${this.refToken}`;
  }
  get sseEndpoint(): string {
    return `${this.widgetsEndpoint}/sse`;
  }

  private readonly getJWT = async (): Promise<string> => {
    return this.auth.getJWT(this.authToken);
  }

  public readonly getSSEConnection = async (): Promise<EventSource> => {
    const jwt = await this.getJWT();

    return new EventSource(`${this.sseEndpoint}?jwt=${jwt}&zoneOffset=${this.zoneOffset}`);
  }

  public readonly fetchData = async (): Promise<Response> => {
    try {
      const jwt = await this.getJWT();
      const responseRaw = await fetch(this.widgetsEndpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        },
      });

      const { response } = await responseRaw.json() as TDResponse<Response>;

      return response;
    } catch (error) {
      throw new FetchError(error);
    }
  }

  public readonly stop = () => {
    this.auth.logout();
  }
}

export default DConnection;
