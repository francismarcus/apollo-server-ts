/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context, UserInterface } from 'interfaces'

export const Program = {
    user: (_: any, args: any, { me, models }: Context): UserInterface => {
        return models.User.findById(me.userId)
    }
}