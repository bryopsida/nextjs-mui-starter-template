export interface IAuthenticationService {
  /**
   * Authenticate that the provided credentials match the set inside the service
   * @param username
   * @param password
   */
  authenticate(username: string, password: string): Promise<boolean>
}

export class AuthenticationService implements IAuthenticationService {
  authenticate(username: string, password: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}

const instance = new AuthenticationService()
export default instance
