export type FavType = {
  authorEmail: string | null;
  createdAt: string | null;
  editorEmail: string | null;
  updatedAt: string | null;
  uuid: string;
  name: string;
  measurementUuids: string[];
  authorUuid: string | null;
  editorUuid: string | null;
  action?: string;
};
