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
