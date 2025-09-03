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

export enum Languages {
  EN = 'EN',
  PL = 'PL',
}

export const LanguageMap: Record<'en' | 'pl', Languages> = {
  en: Languages.EN,
  pl: Languages.PL,
};

export type AuditInfo = {
  authorEmail: string;
  createdAt: string;
  editorEmail: string;
  updatedAt: string;
};
