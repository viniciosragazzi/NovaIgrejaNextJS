import type {
  JourneyAchievementDefinition,
  JourneyBoardMember,
  JourneyOverview,
  JourneyStageDefinition,
  JourneyTaskProgress,
  JourneyTriggerKey,
} from "@/@types/journey.types"
import type { Prisma } from "@prisma/generated/prisma/client"
import { JourneyTriggerType, TypePerson } from "@prisma/generated/prisma/client"

const STAGE_DEFINITIONS: JourneyStageDefinition[] = [
  {
    key: "visitor",
    name: "Visitante",
    description: "Primeiros passos dentro da igreja e da plataforma.",
    order: 1,
    visibleToMember: true,
    pointsReward: 20,
    tasks: [
      {
        key: "complete_onboarding",
        title: "Concluir primeiro acesso",
        description: "Finalize seu cadastro inicial no app.",
        points: 20,
        required: true,
        triggerType: "ONBOARDING_COMPLETED",
      },
      {
        key: "complete_profile",
        title: "Completar perfil",
        description: "Adicione seus dados para melhorar a comunicacao.",
        points: 15,
        required: true,
        triggerType: "PROFILE_COMPLETED",
      },
      {
        key: "first_prayer_request",
        title: "Compartilhar um pedido de oracao",
        description: "Permita que a igreja caminhe com voce em oracao.",
        points: 10,
        required: false,
        triggerType: "FIRST_PRAYER_REQUEST",
      },
    ],
  },
  {
    key: "new_contact",
    name: "Novo Contato",
    description: "A igreja ja iniciou relacionamento e acolhimento.",
    order: 2,
    visibleToMember: true,
    pointsReward: 25,
    tasks: [
      {
        key: "first_attendance",
        title: "Participar do primeiro encontro",
        description: "Registre sua primeira presenca em culto ou reuniao.",
        points: 30,
        required: true,
        triggerType: "FIRST_ATTENDANCE",
      },
      {
        key: "attendance_streak",
        title: "Voltar mais vezes",
        description: "Participe de forma recorrente para ganhar constancia.",
        points: 35,
        required: true,
        triggerType: "ATTENDANCE_STREAK",
      },
    ],
  },
  {
    key: "participating",
    name: "Participando",
    description: "A pessoa ja frequenta e comeca a se integrar.",
    order: 3,
    visibleToMember: true,
    pointsReward: 30,
    tasks: [
      {
        key: "joined_group",
        title: "Entrar em grupo ou celula",
        description: "Conecte-se a um ambiente menor de cuidado e comunhao.",
        points: 25,
        required: false,
        triggerType: "JOINED_GROUP",
      },
      {
        key: "joined_ministry_interest",
        title: "Demonstrar interesse em servir",
        description: "Escolha um ministerio ou area para se envolver.",
        points: 25,
        required: true,
        triggerType: "JOINED_MINISTRY",
      },
    ],
  },
  {
    key: "integrating",
    name: "Integrando",
    description: "A pessoa ja participa e esta em integracao com a casa.",
    order: 4,
    visibleToMember: true,
    pointsReward: 40,
    tasks: [
      {
        key: "confirm_scale",
        title: "Confirmar primeira escala",
        description: "Demonstre compromisso confirmando uma escala de servico.",
        points: 30,
        required: true,
        triggerType: "SCALE_CONFIRMED",
      },
    ],
  },
  {
    key: "active_member",
    name: "Membro Ativo",
    description: "Participacao recorrente e envolvimento saudavel.",
    order: 5,
    visibleToMember: true,
    pointsReward: 50,
    tasks: [],
  },
  {
    key: "volunteer",
    name: "Voluntario",
    description: "Serve regularmente em ministerios da igreja.",
    order: 6,
    visibleToMember: true,
    pointsReward: 60,
    tasks: [],
  },
  {
    key: "leader_track",
    name: "Lider em Desenvolvimento",
    description: "Trilha de desenvolvimento de lideranca e multiplicacao.",
    order: 7,
    visibleToMember: true,
    pointsReward: 80,
    tasks: [],
  },
]

const ACHIEVEMENTS: JourneyAchievementDefinition[] = [
  {
    key: "first_step",
    name: "Primeiro Passo",
    description: "Concluiu o primeiro acesso no app da igreja.",
    icon: "sparkles",
    points: 10,
  },
  {
    key: "profile_ready",
    name: "Perfil Completo",
    description: "Seus dados iniciais foram preenchidos.",
    icon: "user-check",
    points: 15,
  },
  {
    key: "faithful_presence",
    name: "Constancia",
    description: "Participou e voltou em mais encontros.",
    icon: "calendar-check",
    points: 20,
  },
  {
    key: "serving_heart",
    name: "Coracao de Servico",
    description: "Entrou em uma trilha de servico na igreja.",
    icon: "heart-handshake",
    points: 25,
  },
]

export function calculateJourneyLevel(score: number) {
  return Math.max(1, Math.floor(score / 120) + 1)
}

function normalizeTrigger(trigger: JourneyTriggerKey) {
  return JourneyTriggerType[trigger]
}

export async function ensureJourneySetup(
  tx: Prisma.TransactionClient,
  churchId: string
) {
  const existingStages = await tx.journeyStage.findMany({
    where: { churchId },
    select: { id: true, key: true, order: true },
    orderBy: { order: "asc" },
  })

  if (existingStages.length === 0) {
    for (const stage of STAGE_DEFINITIONS) {
      await tx.journeyStage.create({
        data: {
          churchId,
          key: stage.key,
          name: stage.name,
          description: stage.description,
          order: stage.order,
          visibleToMember: stage.visibleToMember,
          pointsReward: stage.pointsReward,
          tasks: {
            create: stage.tasks.map((task) => ({
              key: task.key,
              title: task.title,
              description: task.description,
              points: task.points,
              required: task.required,
              triggerType: normalizeTrigger(task.triggerType),
            })),
          },
        },
      })
    }
  }

  const existingAchievements = await tx.journeyAchievement.findMany({
    where: { churchId },
    select: { id: true },
    take: 1,
  })

  if (existingAchievements.length === 0) {
    await tx.journeyAchievement.createMany({
      data: ACHIEVEMENTS.map((achievement) => ({
        churchId,
        key: achievement.key,
        name: achievement.name,
        description: achievement.description,
        icon: achievement.icon,
        points: achievement.points,
      })),
    })
  }
}

export async function ensurePersonJourney(
  tx: Prisma.TransactionClient,
  personId: string,
  churchId: string
) {
  await ensureJourneySetup(tx, churchId)

  const existingJourney = await tx.personJourney.findUnique({
    where: { personId },
    include: { currentStage: true },
  })

  if (existingJourney) {
    return existingJourney
  }

  const firstStage = await tx.journeyStage.findFirst({
    where: { churchId, active: true },
    orderBy: { order: "asc" },
  })

  if (!firstStage) {
    throw new Error("Nao foi possivel inicializar a jornada da igreja.")
  }

  const createdJourney = await tx.personJourney.create({
    data: {
      personId,
      currentStageId: firstStage.id,
      history: {
        create: {
          toStageId: firstStage.id,
          source: JourneyTriggerType.MANUAL,
          notes: "Jornada iniciada automaticamente.",
        },
      },
    },
    include: { currentStage: true },
  })

  return createdJourney
}

async function recalculateJourneyState(tx: Prisma.TransactionClient, journeyId: string) {
  const journey = await tx.personJourney.findUnique({
    where: { id: journeyId },
    include: {
      currentStage: {
        include: {
          tasks: {
            where: { active: true },
            orderBy: { createdAt: "asc" },
          },
        },
      },
      tasks: {
        include: { task: true },
      },
    },
  })

  if (!journey || !journey.currentStage) {
    return null
  }

  const currentTasks = journey.currentStage.tasks
  const progressMap = new Map(journey.tasks.map((item) => [item.taskId, item]))
  const requiredTasks = currentTasks.filter((task) => task.required)
  const requiredCompleted = requiredTasks.filter((task) => progressMap.get(task.id)?.completed).length
  const progress =
    requiredTasks.length === 0 ? 100 : Math.round((requiredCompleted / requiredTasks.length) * 100)

  const completedTaskPoints = journey.tasks
    .filter((item) => item.completed)
    .reduce((total, item) => total + item.task.points, 0)

  const stageReward = progress === 100 ? journey.currentStage.pointsReward : 0
  const score = completedTaskPoints + stageReward
  const level = calculateJourneyLevel(score)

  const updatedJourney = await tx.personJourney.update({
    where: { id: journeyId },
    data: {
      progress,
      score,
      level,
      lastActivityAt: new Date(),
    },
    include: { currentStage: true },
  })

  return updatedJourney
}

async function maybeAdvanceJourneyStage(tx: Prisma.TransactionClient, journeyId: string) {
  const journey = await tx.personJourney.findUnique({
    where: { id: journeyId },
    include: {
      currentStage: {
        include: {
          tasks: { where: { active: true } },
        },
      },
      tasks: {
        include: { task: true },
      },
      person: true,
    },
  })

  if (!journey?.currentStage) {
    return null
  }

  const requiredTasks = journey.currentStage.tasks.filter((task) => task.required)
  const completedSet = new Set(
    journey.tasks.filter((task) => task.completed).map((task) => task.taskId)
  )
  const stageCompleted = requiredTasks.every((task) => completedSet.has(task.id))

  if (!stageCompleted) {
    return journey
  }

  const nextStage = await tx.journeyStage.findFirst({
    where: {
      churchId: journey.person.churchId,
      active: true,
      order: { gt: journey.currentStage.order },
    },
    orderBy: { order: "asc" },
  })

  if (!nextStage) {
    await tx.personJourney.update({
      where: { id: journey.id },
      data: {
        progress: 100,
        completedAt: new Date(),
      },
    })
    return journey
  }

  await tx.personJourney.update({
    where: { id: journey.id },
    data: {
      currentStageId: nextStage.id,
      progress: 0,
      completedAt: null,
      history: {
        create: {
          fromStageId: journey.currentStage.id,
          toStageId: nextStage.id,
          source: JourneyTriggerType.MANUAL,
          notes: `Avanco automatico para ${nextStage.name}.`,
        },
      },
    },
  })

  return nextStage
}

async function unlockAchievements(tx: Prisma.TransactionClient, personId: string, churchId: string) {
  const [journey, achievements, personAchievements, person] = await Promise.all([
    tx.personJourney.findUnique({
      where: { personId },
      include: { currentStage: true, tasks: { include: { task: true } } },
    }),
    tx.journeyAchievement.findMany({
      where: { churchId, active: true },
    }),
    tx.personAchievement.findMany({
      where: { personId },
      select: { achievementId: true },
    }),
    tx.person.findUnique({
      where: { id: personId },
      select: { type: true, ministry: true },
    }),
  ])

  if (!journey || !person) {
    return
  }

  const earned = new Set(personAchievements.map((item) => item.achievementId))
  const completedTaskKeys = new Set(
    journey.tasks.filter((task) => task.completed).map((task) => task.task.key)
  )

  const shouldEarn = achievements.filter((achievement) => {
    if (earned.has(achievement.id)) {
      return false
    }

    switch (achievement.key) {
      case "first_step":
        return completedTaskKeys.has("complete_onboarding")
      case "profile_ready":
        return completedTaskKeys.has("complete_profile")
      case "faithful_presence":
        return completedTaskKeys.has("attendance_streak")
      case "serving_heart":
        return person.type === TypePerson.VOLUNTEER || completedTaskKeys.has("joined_ministry_interest")
      default:
        return false
    }
  })

  if (shouldEarn.length === 0) {
    return
  }

  await tx.personAchievement.createMany({
    data: shouldEarn.map((achievement) => ({
      personId,
      achievementId: achievement.id,
    })),
    skipDuplicates: true,
  })

  const bonusPoints = shouldEarn.reduce((total, achievement) => total + achievement.points, 0)
  if (bonusPoints > 0) {
    const nextScore = journey.score + bonusPoints
    await tx.personJourney.update({
      where: { id: journey.id },
      data: {
        score: nextScore,
        level: calculateJourneyLevel(nextScore),
        lastActivityAt: new Date(),
      },
    })
  }
}

export async function applyJourneyTrigger(
  tx: Prisma.TransactionClient,
  churchId: string,
  personId: string,
  trigger: JourneyTriggerKey
) {
  const journey = await ensurePersonJourney(tx, personId, churchId)

  const matchingTasks = await tx.journeyTask.findMany({
    where: {
      stage: { churchId },
      triggerType: normalizeTrigger(trigger),
      active: true,
    },
  })

  if (matchingTasks.length > 0) {
    for (const task of matchingTasks) {
      await tx.personJourneyTask.upsert({
        where: {
          journeyId_taskId: {
            journeyId: journey.id,
            taskId: task.id,
          },
        },
        update: {
          completed: true,
          completedAt: new Date(),
          source: normalizeTrigger(trigger),
        },
        create: {
          personId,
          journeyId: journey.id,
          taskId: task.id,
          completed: true,
          completedAt: new Date(),
          source: normalizeTrigger(trigger),
        },
      })
    }
  }

  await recalculateJourneyState(tx, journey.id)
  await maybeAdvanceJourneyStage(tx, journey.id)
  await recalculateJourneyState(tx, journey.id)
  await unlockAchievements(tx, personId, churchId)
}

export async function movePersonToJourneyStage(
  tx: Prisma.TransactionClient,
  churchId: string,
  personId: string,
  targetStageId: string,
  notes?: string
) {
  const [journey, targetStage] = await Promise.all([
    ensurePersonJourney(tx, personId, churchId),
    tx.journeyStage.findFirst({
      where: { id: targetStageId, churchId },
    }),
  ])

  if (!targetStage) {
    throw new Error("Etapa da jornada nao encontrada.")
  }

  const currentJourney = await tx.personJourney.findUnique({
    where: { id: journey.id },
    select: { currentStageId: true },
  })

  await tx.personJourney.update({
    where: { id: journey.id },
    data: {
      currentStageId: targetStage.id,
      progress: 0,
      completedAt: null,
      lastActivityAt: new Date(),
      history: {
        create: {
          fromStageId: currentJourney?.currentStageId || null,
          toStageId: targetStage.id,
          source: JourneyTriggerType.MANUAL,
          notes: notes || `Movido manualmente para ${targetStage.name}.`,
        },
      },
    },
  })

  await recalculateJourneyState(tx, journey.id)
}

export async function buildJourneyOverview(
  tx: Prisma.TransactionClient,
  personId: string,
  churchId: string
): Promise<JourneyOverview | null> {
  await ensurePersonJourney(tx, personId, churchId)

  const [journey, stages, achievements, personAchievements] = await Promise.all([
    tx.personJourney.findUnique({
      where: { personId },
      include: {
        currentStage: true,
        tasks: { include: { task: true } },
      },
    }),
    tx.journeyStage.findMany({
      where: { churchId, active: true },
      include: {
        tasks: {
          where: { active: true },
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { order: "asc" },
    }),
    tx.journeyAchievement.findMany({
      where: { churchId, active: true },
      orderBy: { createdAt: "asc" },
    }),
    tx.personAchievement.findMany({
      where: { personId },
      include: { achievement: true },
      orderBy: { earnedAt: "desc" },
    }),
  ])

  if (!journey) {
    return null
  }

  const taskProgressMap = new Map(journey.tasks.map((item) => [item.taskId, item]))
  const stageViews = stages.map((stage) => {
    const tasks: JourneyTaskProgress[] = stage.tasks.map((task) => {
      const progress = taskProgressMap.get(task.id)
      return {
        id: task.id,
        key: task.key,
        title: task.title,
        description: task.description,
        triggerType: task.triggerType,
        points: task.points,
        required: task.required,
        completed: Boolean(progress?.completed),
        completedAt: progress?.completedAt?.toISOString(),
      }
    })

    const requiredTasks = tasks.filter((task) => task.required)
    const requiredCompletedTasks = requiredTasks.filter((task) => task.completed).length
    const completedTasks = tasks.filter((task) => task.completed).length

    return {
      id: stage.id,
      key: stage.key,
      name: stage.name,
      description: stage.description,
      order: stage.order,
      pointsReward: stage.pointsReward,
      completedTasks,
      totalTasks: tasks.length,
      requiredTasks: requiredTasks.length,
      requiredCompletedTasks,
      completed: requiredTasks.length === 0 ? stage.order < (journey.currentStage?.order || 0) : requiredCompletedTasks === requiredTasks.length,
      current: stage.id === journey.currentStageId,
      tasks,
    }
  })

  const earnedMap = new Map(
    personAchievements.map((item) => [item.achievementId, item.earnedAt.toISOString()])
  )

  return {
    journeyId: journey.id,
    score: journey.score,
    level: journey.level,
    progress: journey.progress,
    startedAt: journey.startedAt.toISOString(),
    lastActivityAt: journey.lastActivityAt?.toISOString(),
    currentStage: stageViews.find((stage) => stage.id === journey.currentStageId),
    nextStage: stageViews.find((stage) => stage.order === (journey.currentStage?.order || 0) + 1),
    stages: stageViews,
    achievements: achievements.map((achievement) => ({
      id: achievement.id,
      key: achievement.key,
      name: achievement.name,
      description: achievement.description,
      icon: achievement.icon,
      points: achievement.points,
      earnedAt: earnedMap.get(achievement.id),
      earned: earnedMap.has(achievement.id),
    })),
  }
}

export async function buildJourneyBoard(
  tx: Prisma.TransactionClient,
  churchId: string
): Promise<Record<string, JourneyBoardMember[]>> {
  await ensureJourneySetup(tx, churchId)

  const journeys = await tx.personJourney.findMany({
    where: {
      person: { churchId },
    },
    include: {
      person: true,
      currentStage: true,
    },
    orderBy: [{ currentStage: { order: "asc" } }, { score: "desc" }],
  })

  return journeys.reduce<Record<string, JourneyBoardMember[]>>((groups, journey) => {
    if (!journey.currentStage) {
      return groups
    }

    const key = journey.currentStage.key
    if (!groups[key]) {
      groups[key] = []
    }

    groups[key].push({
      personId: journey.person.id,
      name: journey.person.name,
      type: journey.person.type.toLowerCase(),
      currentStageName: journey.currentStage.name,
      currentStageKey: journey.currentStage.key,
      score: journey.score,
      level: journey.level,
      progress: journey.progress,
      lastActivityAt: journey.lastActivityAt?.toISOString(),
    })

    return groups
  }, {})
}
