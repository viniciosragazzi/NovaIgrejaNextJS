import {
  ChurchCustomizationSettings,
  ChurchGroupConfig,
  NoticeBoardEntry,
  HomepageWidgetKey,
  MinistryCustomization,
  OrderedToggleItem,
  PermissionModuleKey,
  PermissionStatusKey,
  PrayerRequestEntry,
  PublicSectionKey,
} from "@/@types/church.types"

const homepageWidgetOrder: HomepageWidgetKey[] = [
  "mensagemDoPastor",
  "proximoCulto",
  "eventos",
  "pedidosDeOracao",
  "devocional",
  "ofertas",
  "cursos",
  "banners",
]

const publicSectionOrder: PublicSectionKey[] = [
  "sobreAIgreja",
  "pastores",
  "cultos",
  "eventos",
  "doacoes",
  "contato",
  "galeria",
]

const permissionStatuses: PermissionStatusKey[] = [
  "STAFF",
  "VOLUNTEER",
  "MEMBER",
  "VISITOR",
]

const legacyPermissionAliases: Partial<Record<PermissionStatusKey, string[]>> = {
  STAFF: ["perfilStaff", "perfilAdministrador", "perfilPastor"],
  VOLUNTEER: ["perfilLider"],
}

const permissionModules: PermissionModuleKey[] = [
  "perfil",
  "membros",
  "ministerios",
  "agenda",
  "financeiro",
  "paginaPublica",
  "configuracoes",
]

function asString(value: unknown) {
  return typeof value === "string" ? value : ""
}

function asStringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : []
}

function normalizeOrderedToggle<T extends string>(
  value: unknown,
  fallbackOrder: T[]
): OrderedToggleItem<T>[] {
  if (!Array.isArray(value)) {
    return fallbackOrder.map((key) => ({ key, enabled: true }))
  }

  const mapped = value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null
      }

      const record = item as Record<string, unknown>
      if (typeof record.key !== "string" || !fallbackOrder.includes(record.key as T)) {
        return null
      }

      return {
        key: record.key as T,
        enabled: typeof record.enabled === "boolean" ? record.enabled : true,
      }
    })
    .filter((item): item is OrderedToggleItem<T> => item !== null)

  const missingItems = fallbackOrder
    .filter((key) => !mapped.some((item) => item.key === key))
    .map((key) => ({ key, enabled: true }))

  return [...mapped, ...missingItems]
}

function normalizeGroupCollection(value: unknown): ChurchGroupConfig[] {
  if (!Array.isArray(value)) {
    return []
  }

  const groups: ChurchGroupConfig[] = []

  value.forEach((item, index) => {
    if (!item || typeof item !== "object") {
      return
    }

    const record = item as Record<string, unknown>
    groups.push({
      id: asString(record.id) || `group-${index}`,
      nomeGrupo: asString(record.nomeGrupo),
      liderGrupo: asString(record.liderGrupo),
      dia: asString(record.dia),
      horario: asString(record.horario),
      local: asString(record.local),
      capacidade: asString(record.capacidade),
      descricao: asString(record.descricao),
      status: asString(record.status),
    })
  })

  return groups
}

function normalizeMinistryCustomizations(
  existingMinistries: Array<{ id: string; name: string; description?: string | null }> = [],
  value: unknown
): MinistryCustomization[] {
  const savedItems: MinistryCustomization[] = []

  if (Array.isArray(value)) {
    value.forEach((item) => {
      if (!item || typeof item !== "object") {
        return
      }

      const record = item as Record<string, unknown>
      savedItems.push({
        ministryId: asString(record.ministryId),
        nomeMinisterio: asString(record.nomeMinisterio),
        descricaoMinisterio: asString(record.descricaoMinisterio),
        imagemMinisterio: asString(record.imagemMinisterio),
        liderMinisterio: asString(record.liderMinisterio),
        equipeMinisterio: asString(record.equipeMinisterio),
        vagasAbertas: asString(record.vagasAbertas),
      })
    })
  }

  const merged = existingMinistries.map((ministry) => {
    const saved = savedItems.find((item) => item.ministryId === ministry.id)

    return {
      ministryId: ministry.id,
      nomeMinisterio: saved?.nomeMinisterio || ministry.name,
      descricaoMinisterio: saved?.descricaoMinisterio || ministry.description || "",
      imagemMinisterio: saved?.imagemMinisterio || "",
      liderMinisterio: saved?.liderMinisterio || "",
      equipeMinisterio: saved?.equipeMinisterio || "",
      vagasAbertas: saved?.vagasAbertas || "",
    }
  })

  const extras = savedItems.filter((item) => item.ministryId && !existingMinistries.some((ministry) => ministry.id === item.ministryId))

  return [...merged, ...extras]
}

function createPermissionDefaults() {
  return permissionStatuses.reduce(
    (acc, status) => {
      acc[status] = permissionModules.reduce(
        (modules, module) => {
          modules[module] =
            status === "STAFF" ||
            (status === "VOLUNTEER" && (module === "perfil" || module === "ministerios" || module === "agenda")) ||
            (status === "MEMBER" && module === "perfil")
          return modules
        },
        {} as Record<PermissionModuleKey, boolean>
      )

      return acc
    },
    {} as Record<PermissionStatusKey, Record<PermissionModuleKey, boolean>>
  )
}

function normalizePermissions(value: unknown) {
  const defaults = createPermissionDefaults()

  if (!value || typeof value !== "object") {
    return defaults
  }

  const record = value as Record<string, unknown>

  return permissionStatuses.reduce(
    (acc, status) => {
      const currentValue = record[status]
      const aliasValue = legacyPermissionAliases[status]
        ?.map((key) => record[key])
        .find((item) => item && typeof item === "object")

      const statusRecord =
        (currentValue && typeof currentValue === "object" ? currentValue : aliasValue) &&
        typeof (currentValue && typeof currentValue === "object" ? currentValue : aliasValue) === "object"
          ? ((currentValue && typeof currentValue === "object" ? currentValue : aliasValue) as Record<string, unknown>)
          : {}

      acc[status] = permissionModules.reduce(
        (modules, module) => {
          modules[module] =
            typeof statusRecord[module] === "boolean"
              ? (statusRecord[module] as boolean)
              : defaults[status][module]
          return modules
        },
        {} as Record<PermissionModuleKey, boolean>
      )

      return acc
    },
    {} as Record<PermissionStatusKey, Record<PermissionModuleKey, boolean>>
  )
}

function normalizePrayerRequests(value: unknown): PrayerRequestEntry[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((item, index) => {
      if (!item || typeof item !== "object") {
        return null
      }

      const record = item as Record<string, unknown>
      return {
        id: asString(record.id) || `prayer-${index}`,
        name: asString(record.name),
        contact: asString(record.contact),
        request: asString(record.request),
        createdAt: asString(record.createdAt),
        status: record.status === "reviewed" ? "reviewed" : "pending",
      } satisfies PrayerRequestEntry
    })
    .filter((item): item is PrayerRequestEntry => item !== null && item.request.length > 0)
}

function normalizeNoticeBoard(value: unknown): NoticeBoardEntry[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((item, index) => {
      if (!item || typeof item !== "object") {
        return null
      }

      const record = item as Record<string, unknown>
      return {
        id: asString(record.id) || `notice-${index}`,
        title: asString(record.title),
        content: asString(record.content),
        tag: asString(record.tag),
        ctaLabel: asString(record.ctaLabel),
        ctaUrl: asString(record.ctaUrl),
        published: typeof record.published === "boolean" ? record.published : true,
      } satisfies NoticeBoardEntry
    })
    .filter((item): item is NoticeBoardEntry => item !== null && item.title.length > 0)
}

export const homepageWidgetLabels: Record<HomepageWidgetKey, string> = {
  mensagemDoPastor: "Mensagem do Pastor",
  proximoCulto: "Proximo Culto",
  eventos: "Eventos",
  pedidosDeOracao: "Pedidos de Oracao",
  devocional: "Devocional",
  ofertas: "Ofertas",
  cursos: "Cursos",
  banners: "Banners",
}

export const publicSectionLabels: Record<PublicSectionKey, string> = {
  sobreAIgreja: "Sobre a Igreja",
  pastores: "Pastores",
  cultos: "Cultos",
  eventos: "Eventos",
  doacoes: "Doacoes",
  contato: "Contato",
  galeria: "Galeria",
}

export const permissionStatusLabels: Record<PermissionStatusKey, string> = {
  STAFF: "Critica",
  VOLUNTEER: "Alta",
  MEMBER: "Media",
  VISITOR: "Baixa",
}

export const permissionStatusDescriptions: Record<PermissionStatusKey, string> = {
  STAFF: "Status STAFF",
  VOLUNTEER: "Status VOLUNTEER",
  MEMBER: "Status MEMBER",
  VISITOR: "Status VISITOR",
}

export const permissionModuleLabels: Record<PermissionModuleKey, string> = {
  perfil: "Perfil",
  membros: "Membros",
  ministerios: "Ministerios",
  agenda: "Agenda",
  financeiro: "Financeiro",
  paginaPublica: "Pagina Publica",
  configuracoes: "Configuracoes",
}

export function createDefaultChurchCustomization(
  existingMinistries: Array<{ id: string; name: string; description?: string | null }> = []
): ChurchCustomizationSettings {
  return {
    identidadeVisual: {
      logoPrincipal: { url: "", alt: "" },
      logoSecundaria: { url: "", alt: "" },
      favicon: { url: "", alt: "" },
      imagemCapa: { url: "", alt: "" },
      corPrimaria: "#171717",
      corSecundaria: "#8ee4af",
      corDeApoio: "#f5b8f5",
      tipografia: "moderna",
      modoTema: "light",
    },
    informacoesInstitucionais: {
      descricao: "",
      missao: "",
      visao: "",
      valores: [],
      anoFundacao: "",
      denominacao: "",
      pastorPrincipal: "",
      versiculoDaIgreja: "",
      slogan: "",
      historiaDaIgreja: "",
    },
    estruturaOrganizacional: {
      departamentos: [],
      grupos: [],
      celulas: [],
      liderancas: [],
      ministerios: existingMinistries.map((ministry) => ({
        ministryId: ministry.id,
        nomeMinisterio: ministry.name,
        descricaoMinisterio: ministry.description || "",
        imagemMinisterio: "",
        liderMinisterio: "",
        equipeMinisterio: "",
        vagasAbertas: "",
      })),
    },
    paginaInicial: {
      mensagemDoPastor: "",
      devocional: "",
      pedidosDeOracao: "",
      cursos: "",
      banners: [],
      widgets: homepageWidgetOrder.map((key) => ({ key, enabled: true })),
    },
    localizacao: {
      cep: "",
      endereco: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
      pais: "Brasil",
      latitude: "",
      longitude: "",
      linkMaps: "",
      linkWaze: "",
    },
    doacoes: {
      qrCodePix: "",
      banco: "",
      agencia: "",
      conta: "",
      categoriasDeContribuicao: ["Dizimo", "Oferta"],
      doacoesAtivas: true,
      exibirPublicamente: true,
    },
    comunicacao: {
      mensagemBoasVindas: "",
      mensagemVisitantes: "",
      lembreteCulto: "",
      mensagemAniversario: "",
      mensagemPadraoNotificacao: "",
      canaisDeComunicacao: ["WhatsApp", "Instagram"],
    },
    interacaoPublica: {
      prayerRequestIntro: "",
      prayerRequestSuccessMessage: "Recebemos seu pedido e vamos orar por voce.",
      publicOfferingIntro: "Use este formulario para registrar sua oferta e apoiar a igreja.",
      prayerRequests: [],
      noticeBoard: [],
    },
    permissoes: {
      permissoesPorModulo: createPermissionDefaults(),
    },
    paginaPublica: {
      sobreAIgreja: "",
      pastores: [],
      galeria: [],
      seoTitulo: "",
      seoDescricao: "",
      secoes: publicSectionOrder.map((key) => ({ key, enabled: true })),
    },
  }
}

export function normalizeChurchCustomization(
  value: unknown,
  existingMinistries: Array<{ id: string; name: string; description?: string | null }> = []
): ChurchCustomizationSettings {
  const defaults = createDefaultChurchCustomization(existingMinistries)

  if (!value || typeof value !== "object") {
    return defaults
  }

  const record = value as Record<string, unknown>
  const identidadeVisual =
    record.identidadeVisual && typeof record.identidadeVisual === "object"
      ? (record.identidadeVisual as Record<string, unknown>)
      : {}
  const informacoesInstitucionais =
    record.informacoesInstitucionais && typeof record.informacoesInstitucionais === "object"
      ? (record.informacoesInstitucionais as Record<string, unknown>)
      : {}
  const estruturaOrganizacional =
    record.estruturaOrganizacional && typeof record.estruturaOrganizacional === "object"
      ? (record.estruturaOrganizacional as Record<string, unknown>)
      : {}
  const paginaInicial =
    record.paginaInicial && typeof record.paginaInicial === "object"
      ? (record.paginaInicial as Record<string, unknown>)
      : {}
  const localizacao =
    record.localizacao && typeof record.localizacao === "object"
      ? (record.localizacao as Record<string, unknown>)
      : {}
  const doacoes = record.doacoes && typeof record.doacoes === "object" ? (record.doacoes as Record<string, unknown>) : {}
  const comunicacao =
    record.comunicacao && typeof record.comunicacao === "object"
      ? (record.comunicacao as Record<string, unknown>)
      : {}
  const interacaoPublica =
    record.interacaoPublica && typeof record.interacaoPublica === "object"
      ? (record.interacaoPublica as Record<string, unknown>)
      : {}
  const permissoes =
    record.permissoes && typeof record.permissoes === "object"
      ? (record.permissoes as Record<string, unknown>)
      : {}
  const paginaPublica =
    record.paginaPublica && typeof record.paginaPublica === "object"
      ? (record.paginaPublica as Record<string, unknown>)
      : {}

  return {
    identidadeVisual: {
      logoPrincipal: {
        url: asString((identidadeVisual.logoPrincipal as Record<string, unknown> | undefined)?.url),
        alt: asString((identidadeVisual.logoPrincipal as Record<string, unknown> | undefined)?.alt),
      },
      logoSecundaria: {
        url: asString((identidadeVisual.logoSecundaria as Record<string, unknown> | undefined)?.url),
        alt: asString((identidadeVisual.logoSecundaria as Record<string, unknown> | undefined)?.alt),
      },
      favicon: {
        url: asString((identidadeVisual.favicon as Record<string, unknown> | undefined)?.url),
        alt: asString((identidadeVisual.favicon as Record<string, unknown> | undefined)?.alt),
      },
      imagemCapa: {
        url: asString((identidadeVisual.imagemCapa as Record<string, unknown> | undefined)?.url),
        alt: asString((identidadeVisual.imagemCapa as Record<string, unknown> | undefined)?.alt),
      },
      corPrimaria: asString(identidadeVisual.corPrimaria) || defaults.identidadeVisual.corPrimaria,
      corSecundaria: asString(identidadeVisual.corSecundaria) || defaults.identidadeVisual.corSecundaria,
      corDeApoio: asString(identidadeVisual.corDeApoio) || defaults.identidadeVisual.corDeApoio,
      tipografia:
        identidadeVisual.tipografia === "classica" ||
        identidadeVisual.tipografia === "elegante" ||
        identidadeVisual.tipografia === "moderna"
          ? identidadeVisual.tipografia
          : defaults.identidadeVisual.tipografia,
      modoTema:
        identidadeVisual.modoTema === "dark" ||
        identidadeVisual.modoTema === "system" ||
        identidadeVisual.modoTema === "light"
          ? identidadeVisual.modoTema
          : defaults.identidadeVisual.modoTema,
    },
    informacoesInstitucionais: {
      descricao: asString(informacoesInstitucionais.descricao),
      missao: asString(informacoesInstitucionais.missao),
      visao: asString(informacoesInstitucionais.visao),
      valores: asStringArray(informacoesInstitucionais.valores),
      anoFundacao: asString(informacoesInstitucionais.anoFundacao),
      denominacao: asString(informacoesInstitucionais.denominacao),
      pastorPrincipal: asString(informacoesInstitucionais.pastorPrincipal),
      versiculoDaIgreja: asString(informacoesInstitucionais.versiculoDaIgreja),
      slogan: asString(informacoesInstitucionais.slogan),
      historiaDaIgreja: asString(informacoesInstitucionais.historiaDaIgreja),
    },
    estruturaOrganizacional: {
      departamentos: asStringArray(estruturaOrganizacional.departamentos),
      grupos: normalizeGroupCollection(estruturaOrganizacional.grupos),
      celulas: normalizeGroupCollection(estruturaOrganizacional.celulas),
      liderancas: asStringArray(estruturaOrganizacional.liderancas),
      ministerios: normalizeMinistryCustomizations(existingMinistries, estruturaOrganizacional.ministerios),
    },
    paginaInicial: {
      mensagemDoPastor: asString(paginaInicial.mensagemDoPastor),
      devocional: asString(paginaInicial.devocional),
      pedidosDeOracao: asString(paginaInicial.pedidosDeOracao),
      cursos: asString(paginaInicial.cursos),
      banners: asStringArray(paginaInicial.banners),
      widgets: normalizeOrderedToggle(paginaInicial.widgets, homepageWidgetOrder),
    },
    localizacao: {
      cep: asString(localizacao.cep),
      endereco: asString(localizacao.endereco),
      numero: asString(localizacao.numero),
      complemento: asString(localizacao.complemento),
      bairro: asString(localizacao.bairro),
      cidade: asString(localizacao.cidade),
      estado: asString(localizacao.estado),
      pais: asString(localizacao.pais) || defaults.localizacao.pais,
      latitude: asString(localizacao.latitude),
      longitude: asString(localizacao.longitude),
      linkMaps: asString(localizacao.linkMaps),
      linkWaze: asString(localizacao.linkWaze),
    },
    doacoes: {
      qrCodePix: asString(doacoes.qrCodePix),
      banco: asString(doacoes.banco),
      agencia: asString(doacoes.agencia),
      conta: asString(doacoes.conta),
      categoriasDeContribuicao: asStringArray(doacoes.categoriasDeContribuicao),
      doacoesAtivas: typeof doacoes.doacoesAtivas === "boolean" ? doacoes.doacoesAtivas : defaults.doacoes.doacoesAtivas,
      exibirPublicamente:
        typeof doacoes.exibirPublicamente === "boolean"
          ? doacoes.exibirPublicamente
          : defaults.doacoes.exibirPublicamente,
    },
    comunicacao: {
      mensagemBoasVindas: asString(comunicacao.mensagemBoasVindas),
      mensagemVisitantes: asString(comunicacao.mensagemVisitantes),
      lembreteCulto: asString(comunicacao.lembreteCulto),
      mensagemAniversario: asString(comunicacao.mensagemAniversario),
      mensagemPadraoNotificacao: asString(comunicacao.mensagemPadraoNotificacao),
      canaisDeComunicacao: asStringArray(comunicacao.canaisDeComunicacao),
    },
    interacaoPublica: {
      prayerRequestIntro: asString(interacaoPublica.prayerRequestIntro),
      prayerRequestSuccessMessage:
        asString(interacaoPublica.prayerRequestSuccessMessage) || defaults.interacaoPublica.prayerRequestSuccessMessage,
      publicOfferingIntro:
        asString(interacaoPublica.publicOfferingIntro) || defaults.interacaoPublica.publicOfferingIntro,
      prayerRequests: normalizePrayerRequests(interacaoPublica.prayerRequests),
      noticeBoard: normalizeNoticeBoard(interacaoPublica.noticeBoard),
    },
    permissoes: {
      permissoesPorModulo: normalizePermissions(permissoes.permissoesPorModulo),
    },
    paginaPublica: {
      sobreAIgreja: asString(paginaPublica.sobreAIgreja),
      pastores: asStringArray(paginaPublica.pastores),
      galeria: asStringArray(paginaPublica.galeria),
      seoTitulo: asString(paginaPublica.seoTitulo),
      seoDescricao: asString(paginaPublica.seoDescricao),
      secoes: normalizeOrderedToggle(paginaPublica.secoes, publicSectionOrder),
    },
  }
}
