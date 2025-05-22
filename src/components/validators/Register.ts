import { z } from "zod"

export const stepOneValidation = z
  .object({
    username: z.string().min(5, "min lenght 5"),
    password: z
      .string()
      .min(8, "password lenght must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "password lenght must be at least 8 characters"),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
export type StepOneValidationType = z.infer<typeof stepOneValidation>

export const stepTwoValidation = z.object({
  city: z.string().optional(),
  rodo: z.literal(true),
  termsOfUse: z.literal(true),
})

export type stepTwoValidationType = z.infer<typeof stepTwoValidation>
