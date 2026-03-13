import { z } from "zod"

const mediaFieldSchema = z.object({
  url: z.string(),
  alt: z.string(),
})

const groupConfigSchema = z.object({
  id: z.string().min(1, "Identificador obrigatorio"),
  nomeGrupo: z.string().min(2, "Nome obrigatorio"),
  liderGrupo: z.string().optional().or(z.literal("")),
  dia: z.string().optional().or(z.literal("")),
  horario: z.string().optional().or(z.literal("")),
  local: z.string().optional().or(z.literal("")),
  capacidade: z.string().optional().or(z.literal("")),
  descricao: z.string().optional().or(z.literal("")),
  status: z.string().optional().or(z.literal("")),
})

const ministryCustomizationSchema = z.object({
  ministryId: z.string().min(1, "Ministerio obrigatorio"),
  nomeMinisterio: z.string().min(2, "Nome obrigatorio"),
  descricaoMinisterio: z.string().optional().or(z.literal("")),
  imagemMinisterio: z.string().optional().or(z.literal("")),
  liderMinisterio: z.string().optional().or(z.literal("")),
  equipeMinisterio: z.string().optional().or(z.literal("")),
  vagasAbertas: z.string().optional().or(z.literal("")),
})

const orderedHomepageWidgetSchema = z.object({
  key: z.enum([
    "mensagemDoPastor",
    "proximoCulto",
    "eventos",
    "pedidosDeOracao",
    "devocional",
    "ofertas",
    "cursos",
    "banners",
  ]),
  enabled: z.boolean(),
})

const orderedPublicSectionSchema = z.object({
  key: z.enum([
    "sobreAIgreja",
    "pastores",
    "cultos",
    "eventos",
    "doacoes",
    "contato",
    "galeria",
  ]),
  enabled: z.boolean(),
})

const permissionsByModuleSchema = z.object({
  perfil: z.boolean(),
  membros: z.boolean(),
  ministerios: z.boolean(),
  agenda: z.boolean(),
  financeiro: z.boolean(),
  paginaPublica: z.boolean(),
  configuracoes: z.boolean(),
})

const prayerRequestEntrySchema = z.object({
  id: z.string().min(1, "Identificador obrigatorio"),
  name: z.string().min(2, "Nome obrigatorio"),
  contact: z.string().optional().or(z.literal("")),
  request: z.string().min(5, "Pedido obrigatorio"),
  createdAt: z.string().min(1, "Data obrigatoria"),
  status: z.enum(["pending", "reviewed"]),
})

const noticeBoardEntrySchema = z.object({
  id: z.string().min(1, "Identificador obrigatorio"),
  title: z.string().min(2, "Titulo obrigatorio"),
  content: z.string().min(3, "Conteudo obrigatorio"),
  tag: z.string().optional().or(z.literal("")),
  ctaLabel: z.string().optional().or(z.literal("")),
  ctaUrl: z.string().url("URL invalida").optional().or(z.literal("")),
  published: z.boolean(),
})

export const churchProfileSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  slug: z
    .string()
    .min(3, "Slug deve ter pelo menos 3 caracteres")
    .regex(/^[a-z0-9-]+$/, "Slug deve conter apenas letras minusculas, numeros e hifen"),
  address: z.string().min(5, "Endereco deve ter pelo menos 5 caracteres"),
  customization: z.object({
    identidadeVisual: z.object({
      logoPrincipal: mediaFieldSchema,
      logoSecundaria: mediaFieldSchema,
      favicon: mediaFieldSchema,
      imagemCapa: mediaFieldSchema,
      corPrimaria: z.string().min(4, "Cor primaria obrigatoria"),
      corSecundaria: z.string().min(4, "Cor secundaria obrigatoria"),
      corDeApoio: z.string().min(4, "Cor de apoio obrigatoria"),
      tipografia: z.enum(["moderna", "classica", "elegante"]),
      modoTema: z.enum(["light", "dark", "system"]),
    }),
    informacoesInstitucionais: z.object({
      descricao: z.string().optional().or(z.literal("")),
      missao: z.string().optional().or(z.literal("")),
      visao: z.string().optional().or(z.literal("")),
      valores: z.array(z.string().min(1, "Valor invalido")),
      anoFundacao: z.string().optional().or(z.literal("")),
      denominacao: z.string().optional().or(z.literal("")),
      pastorPrincipal: z.string().optional().or(z.literal("")),
      versiculoDaIgreja: z.string().optional().or(z.literal("")),
      slogan: z.string().optional().or(z.literal("")),
      historiaDaIgreja: z.string().optional().or(z.literal("")),
    }),
    estruturaOrganizacional: z.object({
      departamentos: z.array(z.string().min(1, "Departamento invalido")),
      grupos: z.array(groupConfigSchema),
      celulas: z.array(groupConfigSchema),
      liderancas: z.array(z.string().min(1, "Lideranca invalida")),
      ministerios: z.array(ministryCustomizationSchema),
    }),
    paginaInicial: z.object({
      mensagemDoPastor: z.string().optional().or(z.literal("")),
      devocional: z.string().optional().or(z.literal("")),
      pedidosDeOracao: z.string().optional().or(z.literal("")),
      cursos: z.string().optional().or(z.literal("")),
      banners: z.array(z.string().min(1, "Banner invalido")),
      widgets: z.array(orderedHomepageWidgetSchema),
    }),
    localizacao: z.object({
      cep: z.string().optional().or(z.literal("")),
      endereco: z.string().optional().or(z.literal("")),
      numero: z.string().optional().or(z.literal("")),
      complemento: z.string().optional().or(z.literal("")),
      bairro: z.string().optional().or(z.literal("")),
      cidade: z.string().optional().or(z.literal("")),
      estado: z.string().optional().or(z.literal("")),
      pais: z.string().optional().or(z.literal("")),
      latitude: z.string().optional().or(z.literal("")),
      longitude: z.string().optional().or(z.literal("")),
      linkMaps: z.string().url("Link do Maps invalido").optional().or(z.literal("")),
      linkWaze: z.string().url("Link do Waze invalido").optional().or(z.literal("")),
    }),
    doacoes: z.object({
      qrCodePix: z.string().optional().or(z.literal("")),
      banco: z.string().optional().or(z.literal("")),
      agencia: z.string().optional().or(z.literal("")),
      conta: z.string().optional().or(z.literal("")),
      categoriasDeContribuicao: z.array(z.string().min(1, "Categoria invalida")),
      doacoesAtivas: z.boolean(),
      exibirPublicamente: z.boolean(),
    }),
    comunicacao: z.object({
      mensagemBoasVindas: z.string().optional().or(z.literal("")),
      mensagemVisitantes: z.string().optional().or(z.literal("")),
      lembreteCulto: z.string().optional().or(z.literal("")),
      mensagemAniversario: z.string().optional().or(z.literal("")),
      mensagemPadraoNotificacao: z.string().optional().or(z.literal("")),
      canaisDeComunicacao: z.array(z.string().min(1, "Canal invalido")),
    }),
    interacaoPublica: z.object({
      prayerRequestIntro: z.string().optional().or(z.literal("")),
      prayerRequestSuccessMessage: z.string().optional().or(z.literal("")),
      publicOfferingIntro: z.string().optional().or(z.literal("")),
      prayerRequests: z.array(prayerRequestEntrySchema),
      noticeBoard: z.array(noticeBoardEntrySchema),
    }),
    permissoes: z.object({
      permissoesPorModulo: z.object({
        perfilPastor: permissionsByModuleSchema,
        perfilAdministrador: permissionsByModuleSchema,
        perfilLider: permissionsByModuleSchema,
        perfilStaff: permissionsByModuleSchema,
      }),
    }),
    paginaPublica: z.object({
      sobreAIgreja: z.string().optional().or(z.literal("")),
      pastores: z.array(z.string().min(1, "Pastor invalido")),
      galeria: z.array(z.string().min(1, "Imagem invalida")),
      seoTitulo: z.string().optional().or(z.literal("")),
      seoDescricao: z.string().optional().or(z.literal("")),
      secoes: z.array(orderedPublicSectionSchema),
    }),
  }),
})

export const quickLinkSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Titulo obrigatorio"),
  url: z.string().url("URL invalida"),
})

export const personSchema = z.object({
  fullName: z.string().min(3, "Nome muito curto"),
  whatsapp: z.string().min(10, "WhatsApp invalido"),
  email: z.string().email("E-mail invalido").optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
  birthDate: z.string().optional().or(z.literal("")),
  type: z.enum(["member", "visitor", "volunteer"]),
  ministry: z.string().optional().or(z.literal("")),
  role: z.string().optional().or(z.literal("")),
  notes: z.string().optional().or(z.literal("")),
  firstVisitDate: z.string().optional().or(z.literal("")),
})

export const volunteerScaleSchema = z.object({
  eventDate: z.string().min(1, "Data obrigatoria"),
  eventName: z.string().min(2, "Nome do evento obrigatorio"),
  ministryId: z.string().min(1, "Ministerio obrigatorio"),
  volunteerIds: z.array(z.string()).min(1, "Selecione pelo menos um voluntario"),
  role: z.string().min(1, "Funcao obrigatoria"),
})

export const scheduleEventSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  dayOfWeek: z.enum([
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ]),
  time: z.string().min(5, "Horario obrigatorio"),
  description: z.string().optional(),
})

export const pixKeyTypeLabels = {
  cpf: "CPF",
  cnpj: "CNPJ",
  email: "E-mail",
  phone: "Telefone",
  random: "Chave Aleatoria",
} as const

export const incomeCategoryLabels = {
  tithe: "Dizimo",
  offering: "Oferta",
  missions: "Missoes",
  construction: "Construcao",
  other: "Outros",
} as const

export const pixConfigSchema = z.object({
  pixKeyType: z.enum(["cpf", "cnpj", "email", "phone", "random"]),
  pixKeyValue: z.string().min(1, "Chave PIX e obrigatoria"),
  copyPasteCode: z.string().optional(),
})

export const manualIncomeSchema = z.object({
  amount: z.number().min(0.01, "Valor deve ser maior que zero"),
  category: z.enum(["tithe", "offering", "missions", "construction", "other"]),
  date: z.string().min(1, "Data e obrigatoria"),
  donorName: z.string().optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
})

export const publicPrayerRequestSchema = z.object({
  name: z.string().min(2, "Informe seu nome"),
  contact: z.string().optional().or(z.literal("")),
  request: z.string().min(8, "Descreva seu pedido com mais detalhes"),
})

export const publicOfferingSchema = z.object({
  amount: z.number().min(1, "Valor minimo de R$ 1,00"),
  donorName: z.string().optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
})

export const churchOnboardingSchema = z.object({
  basicInfo: z.object({
    churchName: z.string().min(3, "Informe o nome da igreja"),
    description: z.string().optional().or(z.literal("")),
    denomination: z.string().optional().or(z.literal("")),
    pastorName: z.string().optional().or(z.literal("")),
    slug: z
      .string()
      .min(3, "Defina uma URL para a igreja")
      .regex(/^[a-z0-9-]+$/, "A URL deve conter apenas letras minusculas, numeros e hifen"),
  }),
  branding: z.object({
    logoUrl: z.string().optional().or(z.literal("")),
    coverUrl: z.string().optional().or(z.literal("")),
    primaryColor: z.string().min(4, "Cor primaria obrigatoria"),
    secondaryColor: z.string().min(4, "Cor secundaria obrigatoria"),
  }),
  location: z.object({
    address: z.string().optional().or(z.literal("")),
    city: z.string().optional().or(z.literal("")),
    state: z.string().optional().or(z.literal("")),
    country: z.string().optional().or(z.literal("")),
  }),
  schedules: z.array(
    z.object({
      id: z.string(),
      title: z.string().min(2, "Nome do culto obrigatorio"),
      dayOfWeek: z.enum(["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]),
      time: z.string().min(5, "Horario obrigatorio"),
    })
  ),
  donations: z.object({
    pixKey: z.string().optional().or(z.literal("")),
    pixCopyPaste: z.string().optional().or(z.literal("")),
    skip: z.boolean(),
  }),
})

export const memberOnboardingSchema = z.object({
  profile: z.object({
    fullName: z.string().min(3, "Informe seu nome"),
    phone: z.string().min(10, "Informe um telefone valido"),
    birthDate: z.string().optional().or(z.literal("")),
    profileImage: z.string().optional().or(z.literal("")),
  }),
  interests: z.object({
    ministries: z.array(z.string()),
    areas: z.array(z.string()),
    skills: z.array(z.string()),
    skipped: z.boolean(),
  }),
  communication: z.object({
    eventNotifications: z.boolean(),
    worshipNotifications: z.boolean(),
    churchMessages: z.boolean(),
  }),
})

export type PixConfigFormData = z.infer<typeof pixConfigSchema>
export type ManualIncomeFormData = z.infer<typeof manualIncomeSchema>
export type ChurchProfileSchemaData = z.infer<typeof churchProfileSchema>
export type PublicPrayerRequestFormData = z.infer<typeof publicPrayerRequestSchema>
export type PublicOfferingFormData = z.infer<typeof publicOfferingSchema>
export type ChurchOnboardingFormData = z.infer<typeof churchOnboardingSchema>
export type MemberOnboardingFormData = z.infer<typeof memberOnboardingSchema>
