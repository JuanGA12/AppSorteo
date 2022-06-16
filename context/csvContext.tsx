import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
interface ContextType {
  csv: Array<Participant> | null;
  saveData: (data: Participant[]) => void;
}
interface Participant {
  NOMBRES: string;
  APELLIDOS: string;
  DOC_IDENTIDAD: string;
  MODO: string;
  GANO: string;
  EMAIL: string;
  EMPRESA: string;
}
export const CSVContext = createContext<ContextType>({} as ContextType);

export function useCSVContextState(): ContextType {
  const [csv, setCSV] = useState<Array<Participant> | null>(null);
  const saveData = (data: Participant[]) => setCSV(data);
  return {
    csv,
    saveData,
  };
}
export function useCSVContext() {
  return useContext(CSVContext);
}
