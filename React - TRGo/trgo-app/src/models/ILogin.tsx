export interface ILogin {
    STATUS:  boolean;
    MESSAGE?: string;
    JWT?:     string;
    RESULT?:  RESULT;
    ERROR?:   string
}

export interface Authority {
    authority: string;
}

export interface RESULT {
    password: string;
    username: string;
    authorities: Authority[];
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    enabled: boolean;
}
