export interface IMediaRecord {
  id?: number;
  authorUsername?: string;
  dateCreated?: string | Date;
  dateModified?: string | Date;
  description?: string;
  url: string;
}
