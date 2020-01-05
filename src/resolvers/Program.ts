import { User } from '../models/User'
import { Context } from 'interfaces'

export const Program = {
    user: (_: any, args: any, { me }: Context) => {
        return User.findById(me.userId)
    }
}