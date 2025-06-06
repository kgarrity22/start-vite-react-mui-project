export type FontValidationResult = {
  isValid: boolean;
  familyName: string;
  error?: string;
}; // TODO: think this is just wrong?

export type FontValidationSummary = {
  valid: string[];
  invalid: {
    familyName: string;
    error: string;
  }[];
};

export type GoogleFontsApiResponse = {
  items?: {
    family: string;
    variants: string[];
    subsets: string[];
  }[];
  error?: {
    message: string;
    code: number;
  };
};
