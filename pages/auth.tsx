import Input from "@/components/Input";
import { useCallback, useMemo, useState } from "react";
import axios from 'axios'
import { signIn } from 'next-auth/react'
import { useRouter } from "next/router";

import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

const ACTION_TYPE = {
    REGISTER: {
        NAME: "register",
        TITLE: 'Sign in',
        SUBMIT_TEXT: 'Login',
        TIP_TEXT: 'First time using Netflix?',
        SWITCH_BUTTON_TEXT: 'Create an account'
    },
    LOGIN: {
        NAME: 'login',
        TITLE: 'Register',
        SUBMIT_TEXT: 'Sign Up',
        TIP_TEXT: 'Already have an account?',
        SWITCH_BUTTON_TEXT: 'Login'
    }
}

const Auth = () => {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [variant, setVariant] = useState(ACTION_TYPE.LOGIN.NAME)

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === ACTION_TYPE.LOGIN.NAME 
            ? ACTION_TYPE.REGISTER.NAME 
            : ACTION_TYPE.LOGIN.NAME
        )
    }, [])

    const login = useCallback(async () => {
        try {
            await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl: '/'
            })
            router.push('/')
        } catch (error) {
            console.log(error)
        }
    }, [email, password, router])

    const register = useCallback(async () => {
        try {
            await axios.post('/api/register', {
                email,
                name,
                password
            })
            login()
        } catch (error) {
            console.log(error)
        }
    }, [email, name, password, login])

    const thirdPlatformIconClassNames = useMemo(() => `
        w-10
        h-10
        bg-white
        rounded-full
        flex
        items-center
        justify-center
        cursor-pointer
        hover:opacity-80
        transition
    `, [])

    const {
        title,
        submit,
        submitText,
        tipMessage,
        switchText,
        isRegisterAction
    } = useMemo(() => {
        const isLogin = variant === ACTION_TYPE.LOGIN.NAME
        return {
            isRegisterAction: !isLogin,
            title: isLogin ? ACTION_TYPE.LOGIN.TITLE : ACTION_TYPE.REGISTER.TITLE,
            submit: isLogin ? login : register,
            submitText: isLogin ? ACTION_TYPE.LOGIN.SUBMIT_TEXT : ACTION_TYPE.REGISTER.SUBMIT_TEXT,
            tipMessage: isLogin? ACTION_TYPE.LOGIN.TIP_TEXT : ACTION_TYPE.REGISTER.TIP_TEXT,
            switchText: isLogin ? ACTION_TYPE.LOGIN.SWITCH_BUTTON_TEXT : ACTION_TYPE.REGISTER.SWITCH_BUTTON_TEXT
        }
    }, [variant, login, register])

    return (
        <div className="relative h-full w-ful bg-[url('/images/hero.jpg')] bg-no-repeat bg-fixed bg-center bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" alt="Logo" className="h-12" />
                </nav>
                <div className="flex justify-center">
                    <div className="
                        bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full
                    ">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {title}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {isRegisterAction && (<Input 
                                label="UserName" 
                                onChange={(event: any) => setName(event.target.value)}
                                id="name"
                                value={name}
                            />)}
                            <Input 
                                label="Email" 
                                onChange={(event: any) => setEmail(event.target.value)}
                                id="email"
                                type="email"
                                value={email}
                            />
                            <Input 
                                label="Password" 
                                onChange={(event: any) => setPassword(event.target.value)}
                                id="password"
                                type="password"
                                value={password}
                            />
                        </div>
                        <button onClick={submit} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                            {submitText}
                        </button>
                        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                            <div
                                onClick={() => signIn('google', {
                                    callbackUrl: '/'
                                })}
                                className={thirdPlatformIconClassNames}
                            >
                                <FcGoogle size={30} />
                            </div>
                            <div
                                onClick={() => signIn('github', {
                                    callbackUrl: '/'
                                })}
                                className={thirdPlatformIconClassNames}
                            >
                                <FaGithub size={30} />
                            </div>
                        </div>
                        <p className="text-neutral-500 mt-12">
                            {tipMessage}
                            <span className="text-white ml-l hover:underline cursor-pointer" onClick={toggleVariant}>
                                {switchText}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Auth;