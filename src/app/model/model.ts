export interface DDCoordinates {
  latitude: number;
  longitude: number;
}

export interface DMCoordinates {
  latDegrees: number;
  latMinutes: number;
  lonDegrees: number;
  lonMinutes: number;
}

export interface DMSCoordinates {
  latDegrees: number;
  latMinutes: number;
  latSeconds: number;
  lonDegrees: number;
  lonMinutes: number;
  lonSeconds: number;
}

export interface ConversionHistoryEntry {
  type: string;
  inputValues: object;
  outputValues: object;
  outputMask?: string;
}
