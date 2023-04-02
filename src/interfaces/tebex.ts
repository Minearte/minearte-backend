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