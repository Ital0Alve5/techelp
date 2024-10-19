import { Requests } from '@/shared/types/api/maintenance-requests.type';

export type ClientRequests = Pick<Requests, 'id' | 'userId' | 'date' | 'deviceDescription' | 'currentStatus'>;
