import {
  CreateUserType,
  LoginReturnType,
  ImpersonateReturnType,
} from '@accounts/common';
import { UserFields } from '@app/graphql/types/types';



export type LoginReturnTypeWithUser = LoginReturnType & {
  user: UserFields.Fragment}

export interface TransportInterface {
  createUser(service: string, user: CreateUserType): Promise<string>;
  loginWithService(
    service: string,
    authenticateParams: {
      [key: string]: string | object;
    }
  ): Promise<LoginReturnTypeWithUser>;
  logout(accessToken: string): Promise<void>;
  refreshTokens(accessToken: string, refreshToken: string): Promise<LoginReturnTypeWithUser>;
  verifyEmail(token: string): Promise<void>;
  sendResetPasswordEmail(email: string): Promise<void>;
  sendVerificationEmail(email: string): Promise<void>;
  impersonate(token: string, username: string): Promise<ImpersonateReturnType>;
  resetPassword(token: string, newPassword: string, customHeaders?: object): Promise<void>;
  sendResetPasswordEmail(email: string, customHeaders?: object): Promise<void>
}
