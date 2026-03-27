import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

export interface ChecklistItem {
  id: number;
  text: string;
  checked: boolean;
}

interface MonthData {
  items: ChecklistItem[];
  note: string;
}

interface MonthDataContextType {
  getMonthData: (monthKey: string) => MonthData;
  updateMonthData: (monthKey: string, data: Partial<MonthData>) => void;
}

const MonthDataContext = createContext<MonthDataContextType | null>(null);

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-86e83646`;

const DEFAULT_ITEMS: ChecklistItem[] = [
  { id: 1, text: "", checked: false },
  { id: 2, text: "", checked: false },
  { id: 3, text: "", checked: false },
  { id: 4, text: "", checked: false },
  { id: 5, text: "", checked: false },
];

const DEFAULT_DATA: MonthData = {
  items: DEFAULT_ITEMS,
  note: "",
};

const MONTHS = ["may", "june", "july", "august", "september"];

// Helper function to ensure items have IDs
function normalizeItems(items: any[]): ChecklistItem[] {
  if (!Array.isArray(items)) {
    return DEFAULT_ITEMS.map((i) => ({ ...i }));
  }
  
  return items.map((item, index) => ({
    id: item.id !== undefined ? item.id : index,
    text: typeof item.text === 'string' ? item.text : '',
    checked: Boolean(item.checked),
  }));
}

export function MonthDataProvider({ children }: { children: ReactNode }) {
  const [monthsData, setMonthsData] = useState<Record<string, MonthData>>(() => {
    // Initialize all months with default data
    const initial: Record<string, MonthData> = {};
    MONTHS.forEach((month) => {
      initial[month] = { ...DEFAULT_DATA, items: DEFAULT_ITEMS.map((i) => ({ ...i })) };
    });
    return initial;
  });

  // Load all months data on mount
  useEffect(() => {
    const loadAllMonths = async () => {
      console.log('📡 Loading all months data...');
      const promises = MONTHS.map(async (monthKey) => {
        try {
          const url = `${API_URL}/month/${monthKey}`;
          console.log(`Fetching ${monthKey} from: ${url}`);
          
          const response = await fetch(url, {
            headers: {
              Authorization: `Bearer ${publicAnonKey}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            console.log(`✅ Loaded ${monthKey}:`, { items: data.items?.length, note: data.note?.length });
            
            // Only use server data if it exists and has content
            const hasItems = data.items && Array.isArray(data.items) && data.items.length > 0;
            const hasNote = data.note && typeof data.note === 'string';
            
            // Validate that note is actually a string, not an array
            const validNote = typeof data.note === 'string' ? data.note : '';
            
            return {
              monthKey,
              data: {
                items: hasItems ? normalizeItems(data.items) : DEFAULT_ITEMS.map((i) => ({ ...i })),
                note: validNote,
              },
            };
          } else {
            console.error(`❌ Failed to load ${monthKey}: ${response.status} ${response.statusText}`);
          }
        } catch (error) {
          console.error(`❌ Error loading ${monthKey}:`, error);
          if (error instanceof Error) {
            console.error(`Error details: ${error.message}`);
          }
        }
        return null;
      });

      const results = await Promise.all(promises);
      
      setMonthsData((prev) => {
        const updated = { ...prev };
        results.forEach((result) => {
          if (result) {
            updated[result.monthKey] = result.data;
          }
        });
        return updated;
      });
      
      console.log('✅ All months loading complete');
    };

    loadAllMonths();
  }, []);

  // Auto-refresh all months every 5 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      const promises = MONTHS.map(async (monthKey) => {
        try {
          const response = await fetch(`${API_URL}/month/${monthKey}`, {
            headers: {
              Authorization: `Bearer ${publicAnonKey}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            return {
              monthKey,
              data: {
                items: data.items && data.items.length > 0 ? normalizeItems(data.items) : DEFAULT_ITEMS.map((i) => ({ ...i })),
                note: data.note || "",
              },
            };
          }
        } catch (error) {
          // Silently fail on refresh errors to avoid console spam
          // console.error(`Error refreshing ${monthKey}:`, error);
        }
        return null;
      });

      const results = await Promise.all(promises);
      
      setMonthsData((prev) => {
        const updated = { ...prev };
        results.forEach((result) => {
          if (result) {
            updated[result.monthKey] = result.data;
          }
        });
        return updated;
      });
    }, 10000); // Увеличено до 10 секунд для уменьшения нагрузки

    return () => clearInterval(interval);
  }, []);

  const getMonthData = useCallback(
    (monthKey: string): MonthData => {
      return monthsData[monthKey] || { ...DEFAULT_DATA, items: DEFAULT_ITEMS.map((i) => ({ ...i })) };
    },
    [monthsData]
  );

  const updateMonthData = useCallback((monthKey: string, data: Partial<MonthData>) => {
    setMonthsData((prev) => ({
      ...prev,
      [monthKey]: {
        ...prev[monthKey],
        ...data,
      },
    }));
  }, []);

  return (
    <MonthDataContext.Provider value={{ getMonthData, updateMonthData }}>
      {children}
    </MonthDataContext.Provider>
  );
}

export function useMonthDataContext() {
  const context = useContext(MonthDataContext);
  if (!context) {
    throw new Error("useMonthDataContext must be used within MonthDataProvider");
  }
  return context;
}