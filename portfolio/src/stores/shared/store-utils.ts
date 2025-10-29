// Shared Utilities for Stores
// Shared ID generation utilities
export const generateUniqueId = (prefix: string = 'id'): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const generateMessageId = (messageCount: number): string => {
  return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${messageCount}-${Math.random().toString(36).substr(2, 5)}`;
};

// Array manipulation utilities
export const reorderArray = <T>(
  array: T[], 
  fromIndex: number, 
  toIndex: number
): T[] => {
  const result = [...array];
  const [movedItem] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, movedItem);
  return result;
};

// Generic CRUD helpers
export const updateItemById = <T extends { id: string }>(
  items: T[],
  id: string,
  updates: Partial<Omit<T, 'id'>>
): T[] => {
  return items.map(item => 
    item.id === id ? { ...item, ...updates } : item
  );
};

export const deleteItemById = <T extends { id: string }>(
  items: T[],
  id: string
): T[] => {
  return items.filter(item => item.id !== id);
};

// Array ordering utilities
export const updateOrdersAfterDelete = <T extends { order: number }>(
  items: T[]
): T[] => {
  return items.map((item, index) => ({
    ...item,
    order: index + 1,
  }));
};

export const updateOrdersAfterReorder = <T extends { order: number }>(
  items: T[]
): T[] => {
  return items.map((item, index) => ({
    ...item,
    order: index + 1,
  }));
};