/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context, UserInterface } from 'interfaces'

export const User = {
    programs: (_: any, args: any, { me, models }: Context): UserInterface => {
        return models.Program.find({ userId: me.userId })
    }
}