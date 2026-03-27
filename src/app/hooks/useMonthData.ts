import { useState, useEffect, useCallback, useRef } from "react";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { useMonthDataContext } from "../context/MonthDataContext";
import type { ChecklistItem } from "../context/MonthDataContext";

export type { ChecklistItem };

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-86e83646`;

export function useMonthData(monthKey: string) {
  const { getMonthData, updateMonthData } = useMonthDataContext();
  const monthData = getMonthData(monthKey);
  
  const [items, setItems] = useState<ChecklistItem[]>(monthData.items);
  const [note, setNote] = useState<string>(monthData.note);
  const saveTimeoutRef = useRef<number | null>(null);
  const isInitializedRef = useRef(false);

  console.log(`🔍 useMonthData(${monthKey}): items=${items.length}, note="${note.substring(0, 20)}..."`);

  // Update local state when context data changes
  useEffect(() => {
    console.log(`📥 Context updated for ${monthKey}:`, { itemsCount: monthData.items.length, noteLength: monthData.note.length });
    setItems(monthData.items);
    setNote(monthData.note);
    // Mark as initialized after first load
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      console.log(`✅ Initialized ${monthKey}`);
    }
  }, [monthData]);

  // Save data to server with debounce
  const saveData = useCallback(
    (itemsToSave: ChecklistItem[], noteToSave: string) => {
      // Don't save on initial render
      if (!isInitializedRef.current) {
        return;
      }

      if (saveTimeoutRef.current !== null) {
        clearTimeout(saveTimeoutRef.current);
      }

      // Update context immediately for instant UI updates
      updateMonthData(monthKey, { items: itemsToSave, note: noteToSave });

      const timeout = window.setTimeout(async () => {
        try {
          // Validate data before saving
          const validatedNote = typeof noteToSave === 'string' ? noteToSave : '';
          const validatedItems = Array.isArray(itemsToSave) ? itemsToSave : [];

          const url = `${API_URL}/month/${monthKey}`;

          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${publicAnonKey}`,
            },
            body: JSON.stringify({
              items: validatedItems,
              note: validatedNote,
            }),
          });

          if (response.ok) {
            console.log(`✅ Saved data for ${monthKey}`);
          } else {
            console.warn(`⚠️ Backend unavailable for ${monthKey}, data saved locally only`);
          }
        } catch (error) {
          // Silently fail - data is already saved in context
          console.warn(`⚠️ Backend unavailable for ${monthKey}, data saved locally only`);
        }
      }, 500);

      saveTimeoutRef.current = timeout;
    },
    [monthKey, updateMonthData]
  );

  // Auto-save when items or note changes (but not on initial render)
  useEffect(() => {
    if (isInitializedRef.current) {
      saveData(items, note);
    }
  }, [items, note, saveData]);

  const toggleItem = useCallback((index: number) => {
    setItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], checked: !next[index].checked };
      return next;
    });
  }, []);

  const updateItemText = useCallback((index: number, text: string) => {
    setItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], text };
      return next;
    });
  }, []);

  return { items, note, setNote, toggleItem, updateItemText, isLoading: false };
}