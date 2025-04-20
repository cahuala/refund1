import { useState } from "react";
import { useNavigate } from "react-router";
import { z, ZodError } from "zod"
import { AxiosError } from "axios";
import { api } from "../services/api"
import { Button } from "../components/Button";
import { Input } from "../components/Input";

const signUpSchema = z.object({
    name: z.string().trim().min(1,{ message: "Informe o nome" }),
    email: z.string().email({message:"E-mail inválido"}),
    password:z.string().min(6, { message:"Senha deve ter pelo menos 8 dígitos" }),
    passwordConfirm: z.string({ message:"Confirme a senha" })
}).refine((data)=> data.password === data.passwordConfirm,{
    message:"As senhas não são iguais",
    path:["passwordConfirm"]
})
export function SignUp(){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setpasswordConfirm] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    async function onSubmit(event: React.FormEvent){ 
        event.preventDefault()
        try {
            setIsLoading(true)
            const data = signUpSchema.parse({
                name,
                email,
                password,
                passwordConfirm
            })
            await api.post("/users", data)

            if(confirm("Cadastrado com sucesso. Ir para tela de entrar?")){
                navigate("/")
            }
        } catch (error) {
            console.log(error)
            if(error instanceof ZodError){
                return alert(error.issues[0].message)
            }
            if(error instanceof AxiosError){
                return alert(error.response?.data.message)
            }
            alert("Não foi possivel cadastrar")
        }finally{
            setIsLoading(false)
        }

    }
    return <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
       <Input required legend="Nome" placeholder="Seu nome" onChange={(e)=>setName(e.target.value)} />
       <Input required legend="E-mail" type="email" placeholder="seu@email.com" onChange={(e)=>setEmail(e.target.value)} />
       <Input required legend="Password" type="password" placeholder="s1234546" onChange={(e)=>setPassword(e.target.value)} />
       <Input required legend="Confirmar a Password" type="password" placeholder="s1234546" onChange={(e)=>setpasswordConfirm(e.target.value)} />
       <Button type="submit" isLoading={isLoading} >Cadastrar</Button>
       <a href="/" className="text-sm font-semibold mt-10 mb-4 text-center text-gray-100 hover:text-green-800 transition ease-linear">Entrar agora!</a>
    </form>
}