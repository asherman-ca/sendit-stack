import { z } from 'zod'

export const apiRequestValidator = z.object({
	name: z.string(),
})

export type ApiRequest = z.infer<typeof apiRequestValidator>
