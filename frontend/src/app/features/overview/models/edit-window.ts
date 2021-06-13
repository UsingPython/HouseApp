export type EditWindowType = 'OIL' | 'WATER' | 'POWER';

export interface IEditWindowUpdate {
  date: string;
  filled?: number;
  cubicmeter?: number;
  kwh?: number;
  type: EditWindowType;
  id: number;
}
