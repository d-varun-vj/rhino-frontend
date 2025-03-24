export type Location = {
  uuid: string;
  name: string;
  groups: {
    uuid: string;
    name: string;
  }[];
};

export type Client = {
  name: string;
  uuid: string;
  useAggregateData: boolean;
};

export type Group = {
  uuid: string;
  name: string;
};
