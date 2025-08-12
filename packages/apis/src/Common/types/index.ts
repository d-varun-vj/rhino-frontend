export type NameWithTranslationDto = {
  name: string;
  translationEn: string;
  translationPl: string;
};

export type Options = {
  levelTypes: NameWithTranslationDto[];
  loadTypes: NameWithTranslationDto[];
  endUseAreaTypes: NameWithTranslationDto[];
};

export type MeteringPointTypes = {
  id: number;
  mappId: number;
  name: string;
  unit: string;
  subunit: string;
};

export type MeteringPointTypesRes = {
  data: MeteringPointTypes[];
};
