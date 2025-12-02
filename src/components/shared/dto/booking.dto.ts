export interface basicUserDetailsDto{
    firstname: string;
    lastname: string;
    gender: string;
    Images?: string[];
    age: number;
    isCompanion: boolean;
    reason: string
}

export interface bookingDetailsDto {
    user: basicUserDetailsDto;
    companion: basicUserDetailsDto;
    bookingpurpose?: string;
    city: string;
    lat: number;
    lng: number;
    bookingtime: string;
    bookingstart?: string;
    bookingrate?: number;
    bookingend?: string;
    bookingduration?: string;
    finalRate?: number;
    bookingstatus?: string;
    cancelledReason?: string;
    cancellationDetails? : basicUserDetailsDto
}