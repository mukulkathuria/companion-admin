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
