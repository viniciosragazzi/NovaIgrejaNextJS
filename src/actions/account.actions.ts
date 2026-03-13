"use server"

import { ActionResponse } from "@/@types/shared.types"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { headers } from "next/headers"

type UpdateMyProfileInput = {
  name: string
  image?: string
}

type ChangeMyPasswordInput = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
  revokeOtherSessions?: boolean
}

function normalizeImageValue(value?: string) {
  const trimmed = value?.trim() ?? ""
  return trimmed.length > 0 ? trimmed : null
}

export async function updateMyProfileAction(
  input: UpdateMyProfileInput
): Promise<ActionResponse<{ name: string; image: string | null }>> {
  const requestHeaders = await headers()
  const session = await auth.api.getSession({ headers: requestHeaders })

  if (!session) {
    return { success: false, error: "Sessao invalida. Entre novamente para continuar." }
  }

  const name = input.name.trim()
  const image = normalizeImageValue(input.image)

  if (name.length < 3) {
    return { success: false, error: "Informe um nome com pelo menos 3 caracteres." }
  }

  try {
    await auth.api.updateUser({
      headers: requestHeaders,
      body: {
        name,
        image,
      },
    })

    if (session.user.churchId && session.user.email) {
      await prisma.person.updateMany({
        where: {
          churchId: session.user.churchId,
          email: session.user.email,
        },
        data: {
          name,
          profileImage: image,
        },
      })
    }

    return {
      success: true,
      data: {
        name,
        image,
      },
    }
  } catch {
    return { success: false, error: "Nao foi possivel atualizar seu perfil agora." }
  }
}

export async function changeMyPasswordAction(
  input: ChangeMyPasswordInput
): Promise<ActionResponse> {
  const requestHeaders = await headers()
  const session = await auth.api.getSession({ headers: requestHeaders })

  if (!session) {
    return { success: false, error: "Sessao invalida. Entre novamente para continuar." }
  }

  const currentPassword = input.currentPassword.trim()
  const newPassword = input.newPassword.trim()
  const confirmPassword = input.confirmPassword.trim()

  if (!currentPassword) {
    return { success: false, error: "Informe sua senha atual." }
  }

  if (newPassword.length < 8) {
    return { success: false, error: "A nova senha precisa ter pelo menos 8 caracteres." }
  }

  if (newPassword !== confirmPassword) {
    return { success: false, error: "As senhas nao coincidem." }
  }

  try {
    await auth.api.changePassword({
      headers: requestHeaders,
      body: {
        currentPassword,
        newPassword,
        revokeOtherSessions: input.revokeOtherSessions ?? false,
      },
    })

    return { success: true }
  } catch {
    return { success: false, error: "Nao foi possivel alterar sua senha. Confira a senha atual." }
  }
}
