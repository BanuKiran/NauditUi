import { HRProject } from './hrproject';
import internal from 'stream';
import { User } from './nistuser';
import { Timestamp } from 'firebase/firestore';

export type HRStatus = {

  id: string;
  name: string;
  title: string;
  description: string;
  task: string;
  attachments: string;
  workDate?: string;
  startTime: string;
  endTime: string;
  durations: string;
  tags: string;

};

export type HRStatusRequest = {

  id?: string;
  name?: string;
  title?: string;
  description?: string;
  task?: string;
  attachments?: string;
  workDate?: string;
  startTime?: string;
  endTime?: string;
  durations?: string;
  tags?: string;
};



export type HRStatusState = {
  loadingStatus: string;
  createStatus: string;
  updateStatus: string;
  deleteStatus: string;
  statusChangeStatus: string;
  error: boolean;
  errorMessage: string | null;
  hrStatuses: HRStatus[];  
  hrStatus: HRStatus | null;
  sortBy: string | null;
  filters: {
  name: string;
  };

  selectedHRStatusName: string;

};