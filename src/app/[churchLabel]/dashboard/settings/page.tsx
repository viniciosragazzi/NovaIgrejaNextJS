import { getChurchContext } from "@/lib/get-church-context";
import { redirect } from "next/navigation";
import SettingsPage from "./settings-page";

export default async function Page({ params }: { params: Promise<{ churchLabel: string }> }) {
  const { churchLabel } = await params;
  const { isStaff } = await getChurchContext(churchLabel);
  // 2. Trava de Segurança: Se NÃO for staff, redireciona para o dashboard principal
  if (!isStaff) {
    return redirect(`/${churchLabel}/dashboard`);
  }
  return <SettingsPage isStaff={isStaff} />;
}
