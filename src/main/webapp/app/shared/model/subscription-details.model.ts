import dayjs from 'dayjs';

export interface ISubscriptionDetails {
  id?: number;
  subscriptionName?: string;
  subscriptionStartDate?: dayjs.Dayjs;
  subscriptionExpiryDate?: dayjs.Dayjs;
  additionalComments?: string;
  notificationBeforeExpiry?: number;
  notificationMuteFlag?: boolean;
  notificationTo?: string;
  notificationCc?: string | null;
  notificationBcc?: string | null;
}

export const defaultValue: Readonly<ISubscriptionDetails> = {
  notificationMuteFlag: false,
};
