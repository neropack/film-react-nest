//TODO реализовать DTO для /orders
export interface Ticket {
    film: string;
    session: string;
    daytime: string;
    day: string;
    time: string;
    row: number;
    seat: number;
    price: number;
}

export interface Contacts {
    email: string;
    phone: string;
}

export interface Order extends Contacts {
    tickets: Ticket[];
}

export interface OrderResult extends Ticket {
    id: string;
}