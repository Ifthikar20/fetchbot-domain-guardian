import { create } from 'zustand';
import type { Scan } from '@/types/scan';

interface ScanState {
  scans: Scan[];
  activeScan: Scan | null;
  setScans: (scans: Scan[]) => void;
  addScan: (scan: Scan) => void;
  updateScan: (id: string, updates: Partial<Scan>) => void;
  setActiveScan: (scan: Scan | null) => void;
}

export const useScanStore = create<ScanState>((set) => ({
  scans: [],
  activeScan: null,
  
  setScans: (scans) => set({ scans }),
  
  addScan: (scan) => set((state) => ({ scans: [scan, ...state.scans] })),
  
  updateScan: (id, updates) => set((state) => ({
    scans: state.scans.map((scan) => 
      scan.id === id ? { ...scan, ...updates } : scan
    ),
  })),
  
  setActiveScan: (scan) => set({ activeScan: scan }),
}));
