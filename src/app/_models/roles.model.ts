export class Roles {
    clientName: string;
    key: string;
    secret: string;
    tenantId: string;
    ipAddresses: [string];
    secrectExpiresOn: Date | string;
    permissions: number;
    refreshTokens: [string];
}
