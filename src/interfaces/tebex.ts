export interface packages {
    id:                  number;
    name:                string;
    image:               boolean;
    price:               number;
    expiry_length:       number;
    expiry_period:       string;
    type:                string;
    category:            CategoryClass;
    global_limit:        number;
    global_limit_period: string;
    user_limit:          number;
    user_limit_period:   string;
    servers:             CategoryClass[];
    required_packages:   packages[];
    require_any:         boolean;
    create_giftcard:     boolean;
    show_until:          boolean;
    gui_item:            string;
    disabled:            boolean;
    disable_quantity:    boolean;
    custom_price:        boolean;
    choose_server:       boolean;
    limit_expires:       boolean;
    inherit_commands:    boolean;
    variable_giftcard:   boolean;
    description:         string;
}

export interface CategoryClass {
    id:   number;
    name: string;
}

export interface payment {
    url: string,
    expires: string
}

export interface sale {
    player: string,
    package: string
}

export interface completeSale {
    id:           number;
    amount:       string;
    date:         Date;
    gateway:      Gateway;
    status:       Status;
    currency:     Currency;
    email:        string;
    player:       Player;
    packages:     Package[];
    notes:        Note[];
    creator_code: null;
}

export interface Currency {
    iso_4217: ISO4217;
    symbol:   Symbol;
}

export enum ISO4217 {
    Usd = "USD",
}

export enum Symbol {
    Empty = "$",
}

export interface Gateway {
    id:   number;
    name: GatewayName;
}

export enum GatewayName {
    TebexCheckout = "Tebex Checkout",
}

export interface Note {
    created_at: Date;
    note:       string;
}

export interface Package {
    quantity: number;
    id:       number;
    name:     PackageName;
}

export enum PackageName {
    RangoARTE30D = "Rango ARTE (30d)",
    RangoARTE60D = "Rango ARTE (60d)",
    RangoVIP60D = "Rango VIP (60d)",
}

export interface Player {
    id:   number;
    name: string;
    uuid: string;
}

export enum Status {
    Complete = "Complete",
}
