import { getChurchContext } from "@/lib/get-church-context";
import SettingsPage from "./settings-page";

export default async function Page({ params }: { params: Promise<{ churchLabel: string }> }) {
  const { churchLabel } = await params;
  const { isStaff, user } = await getChurchContext(churchLabel, { requiredModule: "configuracoes" });

  return (
    <SettingsPage
      isStaff={isStaff}
      currentUser={{
        name: user.name,
        email: user.email,
        image: user.image || "",
      }}
    />
  );
}
