export interface Artist {
    id: number;
    name: string;
    rate: number;
    streams: number;
    payout: number;
    payoutPerMonth: number;
    paid: boolean;
    careerStart: string | Date;
}

export type SortDirection = "ascending" | "descending";

export interface SortConfig {
    key: PropertyKey,
    direction: SortDirection
}