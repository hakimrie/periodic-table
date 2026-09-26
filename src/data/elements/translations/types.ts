export interface ElementTranslationId {
  appearance?: string;
  understanding?: {
    simpleTerms: string;
    whyItBehavesThisWay: string;
    keyTakeaways: string[];
  };
  applications?: string[];
  biologicalRole?: {
    humanImportance: string;
    dietarySources?: string[];
  };
  safety?: {
    handlingConcerns: string;
  };
  discovery?: {
    year?: number | string;
    discoverer?: string;
    etymology?: string;
  };
  commonIons?: Record<string, string>; // formula -> explanation in Indonesian
  compounds?: Record<string, { name: string; description: string }>; // formula -> { name, description } in Indonesian
}
