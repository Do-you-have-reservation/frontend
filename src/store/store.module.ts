import { create } from "zustand";

interface TimeEntry {
  machineId: string;
  time: number;
}

interface TimesState {
  times: Map<string, number>;
  updateTimes: (machineId: string, newTime: number) => void;
  getTimes: () => TimeEntry[];
}

export const useStore = create<TimesState>((set, get) => ({
  times: new Map<string, number>(),

  updateTimes: (machineId, newTime) => {
    set((state) => {
      const newTimes = new Map(state.times);
      newTimes.set(machineId, newTime);
      return { times: newTimes };
    });
    console.log(machineId + " updated to " + newTime);
  },

  getTimes: () => {
    return Array.from(get().times).map(([machineId, time]) => ({
      machineId,
      time,
    }));
  },
}));
