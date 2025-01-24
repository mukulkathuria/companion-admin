export interface BookingDto {
    id: number;
    username: string;
    companionName: string;
    bookingDate: string;
    bookingTime: string;
    status: 'Completed' | 'Failed';
    userImage: string;
    companionImage: string;
    companionId: string;
    purpose: string;
    city: string;
    canceledBy?: 'User' | 'Companion';
    cancellationTime?: string;
    cancellationReason?: string;
    transactionId?: string;
    amountPaid: number;
    extensionDuration?: number;
    userReview?: string;
    companionReview?: string;
    rejectionReason?: string;
  }
