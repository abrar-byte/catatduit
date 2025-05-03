import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string) {
  const date = new Date(dateString)
  return format(date, "MMM d, yyyy")
}
export type MappingFunction = (item: any) => { label: string; value: any };

export function createOptions(arr: any, mapFunction?: MappingFunction) {
  const defaultMapping: MappingFunction = (item) => ({
    label: item.name,
    value: item.id,
  });

  if (!mapFunction) {
    mapFunction = defaultMapping;
  }

  if (Array.isArray(arr) && arr.length > 0 && typeof arr[0] === "object") {
    return arr.map(mapFunction);
  } else if (Array.isArray(arr)) {
    return arr.map((item) => ({ label: item, value: item }));
  } else {
    throw new Error("Input harus berupa array");
  }
}

export function formatToIDR(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
}