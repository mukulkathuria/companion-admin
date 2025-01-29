export interface basicUserDetailsDto{
    firstname: string;
    lastname: string;
    Images?: string[];
    age: number;
}

export interface bookingDetailsDto {
    user: basicUserDetailsDto;
    companion: basicUserDetailsDto;
    bookingpurpose?: string;
    city: string;
    lat: number;
    lng: number;
    bookingtime: string;
}