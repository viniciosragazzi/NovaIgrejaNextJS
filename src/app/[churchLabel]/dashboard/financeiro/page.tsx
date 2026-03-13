import { Income, PixConfig } from "@/@types/finance.types";
import { getChurchContext } from "@/lib/get-church-context";
import prisma from "@/lib/prisma";
import FinancePage from "./finance-page";

export default async function Page({ params }: { params: Promise<{ churchLabel: string }> }) {
  const { churchLabel } = await params;
  const { church } = await getChurchContext(churchLabel, { requiredModule: "financeiro" });

  const pixConfig: PixConfig | null = church.pixKeyValue
    ? {
        pixKeyType: church.pixKeyType ? (church.pixKeyType as PixConfig["pixKeyType"]) : "email",
        pixKeyValue: church.pixKeyValue,
        copyPasteCode: church.pixCopyPaste || undefined,
      }
    : null;

  const dbEntries = await prisma.financialEntry.findMany({
    where: {
      churchId: church.id,
      type: "INCOME",
    },
    orderBy: { date: "desc" },
  });

  const initialIncomes: Income[] = dbEntries.map((entry) => ({
    id: entry.id,
    amount: entry.amount,
    category: entry.category as Income["category"],
    date: entry.date.toISOString().split("T")[0],
    donorName: entry.donorName || undefined,
    description: entry.description || undefined,
  }));

  return (
    <FinancePage
      churchId={church.id}
      initialPixConfig={pixConfig}
      initialIncomes={initialIncomes}
    />
  );
}
