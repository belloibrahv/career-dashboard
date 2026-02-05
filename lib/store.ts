import { create } from 'zustand';

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  appliedDate: string;
  status: 'applied' | 'interview' | 'rejected' | 'offer';
  notes: string;
}

export interface InterviewSession {
  id: string;
  date: string;
  type: 'frontend' | 'fullstack' | 'system-design';
  duration: number;
  score: number;
  notes: string;
}

export interface HabitEntry {
  id: string;
  date: string;
  category: 'learning' | 'writing' | 'freelancing' | 'interview-prep';
  description: string;
  completed: boolean;
}

export interface FinanceEntry {
  id: string;
  date: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
}

export interface HealthEntry {
  id: string;
  date: string;
  mood: 'excellent' | 'good' | 'okay' | 'poor';
  energy: number;
  sleep: number;
  exercise: boolean;
  symptoms: string;
  actions: string;
  notes: string;
}

interface Store {
  jobs: JobApplication[];
  interviews: InterviewSession[];
  habits: HabitEntry[];
  finances: FinanceEntry[];
  health: HealthEntry[];
  
  addJob: (job: Omit<JobApplication, 'id'>) => void;
  updateJob: (id: string, job: Partial<JobApplication>) => void;
  deleteJob: (id: string) => void;
  
  addInterview: (interview: Omit<InterviewSession, 'id'>) => void;
  updateInterview: (id: string, interview: Partial<InterviewSession>) => void;
  deleteInterview: (id: string) => void;
  
  addHabit: (habit: Omit<HabitEntry, 'id'>) => void;
  updateHabit: (id: string, habit: Partial<HabitEntry>) => void;
  deleteHabit: (id: string) => void;
  
  addFinance: (finance: Omit<FinanceEntry, 'id'>) => void;
  updateFinance: (id: string, finance: Partial<FinanceEntry>) => void;
  deleteFinance: (id: string) => void;
  
  addHealth: (health: Omit<HealthEntry, 'id'>) => void;
  updateHealth: (id: string, health: Partial<HealthEntry>) => void;
  deleteHealth: (id: string) => void;
  
  hydrate: () => void;
  persist: () => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);
const STORAGE_KEY = 'career-dashboard-store';

export const useStore = create<Store>((set, get) => ({
  jobs: [],
  interviews: [],
  habits: [],
  finances: [],
  health: [],
  
  addJob: (job) => set((state) => ({
    jobs: [...state.jobs, { ...job, id: generateId() }]
  })),
  updateJob: (id, job) => set((state) => ({
    jobs: state.jobs.map((j) => j.id === id ? { ...j, ...job } : j)
  })),
  deleteJob: (id) => set((state) => ({
    jobs: state.jobs.filter((j) => j.id !== id)
  })),
  
  addInterview: (interview) => set((state) => ({
    interviews: [...state.interviews, { ...interview, id: generateId() }]
  })),
  updateInterview: (id, interview) => set((state) => ({
    interviews: state.interviews.map((i) => i.id === id ? { ...i, ...interview } : i)
  })),
  deleteInterview: (id) => set((state) => ({
    interviews: state.interviews.filter((i) => i.id !== id)
  })),
  
  addHabit: (habit) => set((state) => ({
    habits: [...state.habits, { ...habit, id: generateId() }]
  })),
  updateHabit: (id, habit) => set((state) => ({
    habits: state.habits.map((h) => h.id === id ? { ...h, ...habit } : h)
  })),
  deleteHabit: (id) => set((state) => ({
    habits: state.habits.filter((h) => h.id !== id)
  })),
  
  addFinance: (finance) => set((state) => ({
    finances: [...state.finances, { ...finance, id: generateId() }]
  })),
  updateFinance: (id, finance) => set((state) => ({
    finances: state.finances.map((f) => f.id === id ? { ...f, ...finance } : f)
  })),
  deleteFinance: (id) => set((state) => ({
    finances: state.finances.filter((f) => f.id !== id)
  })),
  
  addHealth: (health) => set((state) => ({
    health: [...state.health, { ...health, id: generateId() }]
  })),
  updateHealth: (id, health) => set((state) => ({
    health: state.health.map((h) => h.id === id ? { ...h, ...health } : h)
  })),
  deleteHealth: (id) => set((state) => ({
    health: state.health.filter((h) => h.id !== id)
  })),
  
  hydrate: () => {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        set(data);
      }
    } catch (error) {
      console.error('Failed to hydrate store:', error);
    }
  },
  
  persist: () => {
    if (typeof window === 'undefined') return;
    try {
      const state = get();
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        jobs: state.jobs,
        interviews: state.interviews,
        habits: state.habits,
        finances: state.finances,
        health: state.health,
      }));
    } catch (error) {
      console.error('Failed to persist store:', error);
    }
  },
}));
