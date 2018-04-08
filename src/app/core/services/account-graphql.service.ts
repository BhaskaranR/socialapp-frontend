import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import {
    CreateUserType,
    LoginReturnType,
    ImpersonateReturnType,
} from '@accounts/common';

import {
    sendResetPasswordEmailMutation,
    sendVerificationEmailMutation,
    resetPasswordMutation,
    logoutMutation,
    verifyEmailMutation,
    createUserMutation,
    defaultUserFieldsFragment,
    serviceAuthenticateMutation,
    createRefreshTokenMutation,
    createImpersonateMutation,
} from '@app/graphql/queries/accounts';
import { userFieldsFragment } from '@app/graphql/queries/user.fragment';
import { Injectable } from '@angular/core';
import { TransportInterface } from '@app/core/accounts/transport-interface';

export interface OptionsType {
    graphQLClient?: Apollo,
    userFieldsFragment?: string,
};

@Injectable()
export class AccountGraphQLClient implements TransportInterface {
    private options: OptionsType;

    constructor(graphQLClient: Apollo) {
        this.options = {
            graphQLClient: graphQLClient,
            userFieldsFragment: userFieldsFragment,
        };

        this.options.userFieldsFragment = gql`${this.options.userFieldsFragment}`;

        if (!this.options.graphQLClient ||
            !this.options.graphQLClient.query ||
            !this.options.graphQLClient.mutate) {
            throw new Error('Invalid GraphQL client provided: missing \'query\' and \'mutate\' methods!');
        }
    }

    public async loginWithService(
        service: string,
        authenticateParams: {
          [key: string]: string | object;
        }
      ): Promise<LoginReturnType> {
        const loginMutation = serviceAuthenticateMutation(this.options.userFieldsFragment);
        return await this.mutate(loginMutation, 'serviceAuthenticate',
        {
            serviceName:  service,
            userFields: authenticateParams
        });
    }

    public async impersonate(accessToken: string, username: string): Promise<ImpersonateReturnType> {
        const impersonateMutation = createImpersonateMutation(this.options.userFieldsFragment);
        return await this.mutate(impersonateMutation, 'impersonate', { accessToken, username });
    }

    public async createUser(serviceName: string, user: CreateUserType): Promise<string> {
        return await this.mutate(createUserMutation, 'registerPassword', { 
            serviceName: serviceName,
            user: user
         });
    }

    public async refreshTokens(accessToken: string, refreshToken: string): Promise<LoginReturnType> {
        const mutation = createRefreshTokenMutation(this.options.userFieldsFragment);
        return await this.mutate(mutation, 'refreshTokens', { accessToken, refreshToken });
    }

    public async logout(accessToken: string): Promise<void> {
        return await this.mutate(logoutMutation, 'logout', { accessToken });
    }

    public async verifyEmail(token: string): Promise<void> {
        return await this.mutate(verifyEmailMutation, 'verifyEmail', { token });
    }

    public async resetPassword(token: string, newPassword: string): Promise<void> {
        return await this.mutate(resetPasswordMutation, 'resetPassword', { token, newPassword });
    }

    public async sendVerificationEmail(email: string): Promise<void> {
        return await this.mutate(sendVerificationEmailMutation, 'sendVerificationEmail', { email });
    }

    public async sendResetPasswordEmail(email: string): Promise<void> {
        return await this.mutate(sendResetPasswordEmailMutation, 'sendResetPasswordEmail', { email });
    }

    private async mutate(mutation, resultField, variables) {
        return await
            new Promise((resolve, reject) => {
                this.options.graphQLClient.mutate({
                    mutation,
                    variables,
                }).subscribe((d) => {
                    resolve(d);
                }, (error) => {
                    reject(error)
                })
            })
                .then(({ data }) => (data[resultField]))
                .catch((e) => {
                    throw new Error(e.message);
                });
    }

    private async query(query, resultField, variables) {
        return await
            new Promise((resolve, reject) => {
                this.options.graphQLClient.query({
                    query,
                    variables,
                }).subscribe((d) => {
                    resolve(d)
                }, (error) => reject(error))
            }).then(({ data }) => (data[resultField]))
                .catch((e) => {
                    throw new Error(e.message);
                });
    }
}