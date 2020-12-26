export interface TimeRecordModel {
  hours: number;
  description: string;
  project: string | number;
  edit?: boolean;
}

export interface TimeSheetEntryProps {
  [date: string]: TimeRecordModel[];
}

export interface ResponseModel {
  monthly: TimeSheetEntryProps;
}
