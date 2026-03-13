import { PixConfigFormData, ManualIncomeFormData } from "@/lib/validations";

export interface Income extends ManualIncomeFormData {
  id: string;
}

export interface PixConfig extends PixConfigFormData {
  copyPasteCode?: string;
}

export type IncomeCategory = keyof typeof import("@/lib/validations").incomeCategoryLabels;
export type PixKeyType = keyof typeof import("@/lib/validations").pixKeyTypeLabels;
