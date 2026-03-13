export type JourneyTriggerKey =
  | "MANUAL"
  | "PROFILE_COMPLETED"
  | "ONBOARDING_COMPLETED"
  | "FIRST_ATTENDANCE"
  | "ATTENDANCE_STREAK"
  | "JOINED_MINISTRY"
  | "JOINED_GROUP"
  | "FIRST_PRAYER_REQUEST"
  | "SCALE_CONFIRMED"

export type JourneyStageKey =
  | "visitor"
  | "new_contact"
  | "participating"
  | "integrating"
  | "active_member"
  | "volunteer"
  | "leader_track"

export type JourneyTaskDefinition = {
  key: string
  title: string
  description: string
  points: number
  required: boolean
  triggerType: JourneyTriggerKey
}

export type JourneyStageDefinition = {
  key: JourneyStageKey
  name: string
  description: string
  order: number
  visibleToMember: boolean
  pointsReward: number
  tasks: JourneyTaskDefinition[]
}

export type JourneyAchievementDefinition = {
  key: string
  name: string
  description: string
  icon: string
  points: number
}

export type JourneyTaskProgress = {
  id: string
  key: string
  title: string
  description: string
  triggerType: JourneyTriggerKey
  points: number
  required: boolean
  completed: boolean
  completedAt?: string
}

export type JourneyStageProgress = {
  id: string
  key: string
  name: string
  description: string
  order: number
  pointsReward: number
  completedTasks: number
  totalTasks: number
  requiredTasks: number
  requiredCompletedTasks: number
  completed: boolean
  current: boolean
  tasks: JourneyTaskProgress[]
}

export type JourneyAchievementView = {
  id: string
  key: string
  name: string
  description: string
  icon: string
  points: number
  earnedAt?: string
  earned: boolean
}

export type JourneyOverview = {
  journeyId: string
  score: number
  level: number
  progress: number
  startedAt: string
  lastActivityAt?: string
  currentStage?: JourneyStageProgress
  nextStage?: JourneyStageProgress
  stages: JourneyStageProgress[]
  achievements: JourneyAchievementView[]
}

export type JourneyBoardMember = {
  personId: string
  name: string
  type: string
  currentStageName: string
  currentStageKey: string
  score: number
  level: number
  progress: number
  lastActivityAt?: string
}
