export type bookingtableRowsDto = {
  id: number;
  name: string;
  location?: string;
  gender: string;
  bookingTime: string;
};

export type bookingColumnsDto = {
  id: number;
  label: string;
};

export interface addCommentonIssueInputDto {
  issueId: string;
  comment: string;
}

export enum BookingStatusEnum {
  ACCEPTED = 'ACCEPTED',
  UNDERREVIEW = 'UNDERREVIEW',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED',
  UNDERCANCELLATION = 'UNDERCANCELLATION',
  CANCELLATIONAPPROVED = 'CANCELLATIONAPPROVED',
  CANCELLED = 'CANCELLED',
  TRANSACTIONPENDING = 'TRANSACTIONPENDING',
  UNDEREXTENSION = 'UNDEREXTENSION',
  CANCELLEDREFUNDPENDING = 'CANCELLEDREFUNDPENDING',
}

export interface updateBookingStatusInputDto {
  bookingid: number;
  status: BookingStatusEnum;
}