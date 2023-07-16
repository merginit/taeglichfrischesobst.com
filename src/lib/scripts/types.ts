export interface Gig {
    date: string;
    time: string | null;
    location: string;
    event: string;
    tickets: string | boolean | null;
}