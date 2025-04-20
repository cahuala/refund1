import { useActionState } from "react";
import { z, ZodError } from "zod"

import { api } from "../services/api"

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { AxiosError } from "axios";
import { useAuth } from "../hooks/useAuth";

const signInScheme = z.object({
    email:z.string().email({message:"E-mail inválido"}),
    password:z.string().trim().min(1,{message:"Informe a senha"})
})
export function SignIn(){
    const [state,formData,isLoading] = useActionState(signIn,null)
    const auth = useAuth()
        async  function signIn(_:any,formData: FormData){
        try {
            const data = signInScheme.parse({
                email: formData.get("email"),
                password: formData.get("password")
            })

            const response = await api.post("/sessions",data)
            auth.save(response.data)

        } catch (error) {
            if(error instanceof ZodError){
                return {message:error.issues[0].message}
            }
            if(error instanceof AxiosError ){
                return {message: error.response?.data.message}
            }

            return {message:"Não foi possivel entrar"}
        }
        
        

        
    }
    return <form action={formData} className="w-full flex flex-col gap-4">
       <Input required legend="E-mail" name="email"  type="email" placeholder="seu@email.com"  />
       <Input required legend="Password" name="password"  type="password" placeholder="s1234546"  />
       <p className="text-sm text-red-600 text-center my-4 font-medium">
            { state?.message }
       </p>
       <Button type="submit" isLoading={isLoading}>Entrar</Button>
       <a href="/sign-up" className="text-sm font-semibold mt-10 mb-4 text-center text-gray-100 hover:text-green-800 transition ease-linear">Não tem uma conta? Crie uma agora!</a>
    </form>
} 