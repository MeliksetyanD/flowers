import { extendType, nonNull, objectType, stringArg } from "nexus";
import { Context } from "../types/Context";
import argon2 from 'argon2'
import { User } from "../entities/User";
import * as jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

export const AuthType = objectType({
    name: "AuthType",
    definition(t) {
        t.nonNull.string("token"),
        t.nonNull.field("user", {
            type: "User",
        });
    },
})

export const AuthMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("login", {
            type: "AuthType",
            args: {username: nonNull(stringArg()), password: nonNull(stringArg())},
            async resolve(_parent, args, _context: Context, _info){
                const {username, password} = args
                const user = await User.findOne({where: {username}})

                if(!user){
                    throw new Error("USer not found!")
                }

                const isValid = await argon2.verify(user.password, password)

                if(!isValid){
                    throw new Error("Invalid creds!")
                }

                const Secret_key = process.env.TOKEN_SECRET
                const token = jwt.sign({ userId: user.id }, Secret_key as jwt.Secret)

                return {token, user}

            }
        })
        t.nonNull.field("register", {
            type: "AuthType",
            args: {
                username: nonNull(stringArg()),
                email: nonNull(stringArg()),
                password: nonNull(stringArg())
            },
            async resolve(_parent, args, context: Context, _info) {
                const { username, email, password } = args
                const hashpass = await argon2.hash(password)
                let user;
                let token;

                try {
                    const result = await context.conn.createQueryBuilder().insert().into(User).values({ username, email, password: hashpass, cart: JSON.stringify([]) }).execute();
                    const Secret_key = process.env.TOKEN_SECRET
                    const id = result.generatedMaps[0].id

                    user = await User.findOne({ where: { id } });
                    token = jwt.sign({ userId: id }, Secret_key as jwt.Secret)

                } catch (error) {
                    console.log(error)
                }

                return {
                    user,
                    token
                }

            }
        })
    },
})