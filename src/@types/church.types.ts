export type ThemeMode = "light" | "dark" | "system"
export type TypographyPreset = "moderna" | "classica" | "elegante"

export type HomepageWidgetKey =
  | "mensagemDoPastor"
  | "proximoCulto"
  | "eventos"
  | "pedidosDeOracao"
  | "devocional"
  | "ofertas"
  | "cursos"
  | "banners"

export type PublicSectionKey =
  | "sobreAIgreja"
  | "pastores"
  | "cultos"
  | "eventos"
  | "doacoes"
  | "contato"
  | "galeria"

export type PermissionModuleKey =
  | "perfil"
  | "membros"
  | "ministerios"
  | "agenda"
  | "financeiro"
  | "paginaPublica"
  | "configuracoes"

export type PermissionRoleKey = "perfilPastor" | "perfilAdministrador" | "perfilLider" | "perfilStaff"

export interface OrderedToggleItem<T extends string> {
  key: T
  enabled: boolean
}

export interface ChurchMediaField {
  url: string
  alt: string
}

export interface ChurchBrandingSettings {
  logoPrincipal: ChurchMediaField
  logoSecundaria: ChurchMediaField
  favicon: ChurchMediaField
  imagemCapa: ChurchMediaField
  corPrimaria: string
  corSecundaria: string
  corDeApoio: string
  tipografia: TypographyPreset
  modoTema: ThemeMode
}

export interface ChurchInstitutionalSettings {
  descricao: string
  missao: string
  visao: string
  valores: string[]
  anoFundacao: string
  denominacao: string
  pastorPrincipal: string
  versiculoDaIgreja: string
  slogan: string
  historiaDaIgreja: string
}

export interface ChurchGroupConfig {
  id: string
  nomeGrupo: string
  liderGrupo?: string
  dia?: string
  horario?: string
  local?: string
  capacidade?: string
  descricao?: string
  status?: string
}

export interface MinistryCustomization {
  ministryId: string
  nomeMinisterio: string
  descricaoMinisterio?: string
  imagemMinisterio?: string
  liderMinisterio?: string
  equipeMinisterio?: string
  vagasAbertas?: string
}

export interface ChurchOrganizationSettings {
  departamentos: string[]
  grupos: ChurchGroupConfig[]
  celulas: ChurchGroupConfig[]
  liderancas: string[]
  ministerios: MinistryCustomization[]
}

export interface ChurchHomepageSettings {
  mensagemDoPastor: string
  devocional: string
  pedidosDeOracao: string
  cursos: string
  banners: string[]
  widgets: OrderedToggleItem<HomepageWidgetKey>[]
}

export interface ChurchLocationSettings {
  cep: string
  endereco: string
  numero: string
  complemento: string
  bairro: string
  cidade: string
  estado: string
  pais: string
  latitude: string
  longitude: string
  linkMaps: string
  linkWaze: string
}

export interface ChurchDonationSettings {
  qrCodePix: string
  banco: string
  agencia: string
  conta: string
  categoriasDeContribuicao: string[]
  doacoesAtivas: boolean
  exibirPublicamente: boolean
}

export interface ChurchCommunicationSettings {
  mensagemBoasVindas: string
  mensagemVisitantes: string
  lembreteCulto: string
  mensagemAniversario: string
  mensagemPadraoNotificacao: string
  canaisDeComunicacao: string[]
}

export interface PrayerRequestEntry {
  id: string
  name: string
  contact: string
  request: string
  createdAt: string
  status: "pending" | "reviewed"
}

export interface NoticeBoardEntry {
  id: string
  title: string
  content: string
  tag: string
  ctaLabel: string
  ctaUrl: string
  published: boolean
}

export interface ChurchPublicInteractionSettings {
  prayerRequestIntro: string
  prayerRequestSuccessMessage: string
  publicOfferingIntro: string
  prayerRequests: PrayerRequestEntry[]
  noticeBoard: NoticeBoardEntry[]
}

export interface ChurchPermissionsSettings {
  permissoesPorModulo: Record<PermissionRoleKey, Record<PermissionModuleKey, boolean>>
}

export interface ChurchPublicPageSettings {
  sobreAIgreja: string
  pastores: string[]
  galeria: string[]
  seoTitulo: string
  seoDescricao: string
  secoes: OrderedToggleItem<PublicSectionKey>[]
}

export interface ChurchCustomizationSettings {
  identidadeVisual: ChurchBrandingSettings
  informacoesInstitucionais: ChurchInstitutionalSettings
  estruturaOrganizacional: ChurchOrganizationSettings
  paginaInicial: ChurchHomepageSettings
  localizacao: ChurchLocationSettings
  doacoes: ChurchDonationSettings
  comunicacao: ChurchCommunicationSettings
  interacaoPublica: ChurchPublicInteractionSettings
  permissoes: ChurchPermissionsSettings
  paginaPublica: ChurchPublicPageSettings
}

export interface Church {
  id: string
  name: string
  label: string
  address: string
  phone?: string
  email?: string
  description?: string
  logo?: string
  theme?: string
  pixKeyType?: string | null
  pixKeyValue?: string | null
  pixCopyPaste?: string | null
  customization?: ChurchCustomizationSettings | null
}

export interface ChurchLink {
  id: string
  title: string
  url: string
  icon?: string
  active?: boolean
}

export interface ChurchProfileFormData {
  name: string
  slug: string
  address: string
  customization: ChurchCustomizationSettings
}
