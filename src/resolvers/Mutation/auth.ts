import { MutationResolvers, AuthPayload, MutationLoginArgs, MutationSignupArgs } from 'types'
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
import { User } from '../../models/User'

    const signup: MutationResolvers["signup"] = async (_, args: MutationSignupArgs, ctx): Promise<AuthPayload> => {
        const password = await bcrypt.hash(args.password, 10)
        const user = await User.create({
            ...args, password
        })
        console.log(user)
        return {
            token: jwt.sign({ userId: user.id}, process.env.APP_SECRET),
            user
        }
    }

    const login: MutationResolvers["login"] = async (_, { email, password }: MutationLoginArgs, ctx): Promise<AuthPayload> => {
        const user = await User.findOne({ email })

        if (!user) throw new Error(`No user found for email: ${email}`)
      const passwordValid = await bcrypt.compare(password, user.password)
        if (!passwordValid) throw new Error('Invalid password')
    
        return {
            token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
            user
        }
    }


export default {
    login,
    signup
}
