export interface IReviewPayload {
  [x: string]: any;
  bookingId: string;
  rating: number;
  comment?: string;
}