export type ChurchOnboardingScheduleInput = {
  id: string
  title: string
  dayOfWeek: "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday"
  time: string
}

export type ChurchOnboardingDraft = {
  welcomeCompleted: boolean
  basicInfo: {
    churchName: string
    description: string
    denomination: string
    pastorName: string
    slug: string
  }
  branding: {
    logoUrl: string
    coverUrl: string
    primaryColor: string
    secondaryColor: string
  }
  location: {
    address: string
    city: string
    state: string
    country: string
  }
  schedules: ChurchOnboardingScheduleInput[]
  donations: {
    pixKey: string
    pixCopyPaste: string
    skip: boolean
  }
}

export type MemberOnboardingDraft = {
  step: number
  profile: {
    fullName: string
    phone: string
    birthDate: string
    profileImage: string
  }
  interests: {
    ministries: string[]
    areas: string[]
    skills: string[]
    skipped: boolean
  }
  communication: {
    eventNotifications: boolean
    worshipNotifications: boolean
    churchMessages: boolean
  }
}
