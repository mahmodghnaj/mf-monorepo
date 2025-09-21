
    export type RemoteKeys = 'passport_form/PassportForm';
    type PackageType<T> = T extends 'passport_form/PassportForm' ? typeof import('passport_form/PassportForm') :any;