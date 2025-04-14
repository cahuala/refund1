import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function SignIn(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    function onSubmit(event: React.FormEvent){ 
        alert("Form submitted")
        event.preventDefault()
    }
    return <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
       <Input required legend="E-mail" type="email" placeholder="seu@email.com" onChange={(e)=>setEmail(e.target.value)} />
       <Input required legend="Password" type="password" placeholder="s1234546" onChange={(e)=>setPassword(e.target.value)} />
       <Button type="submit">Entrar</Button>
       <a href="/sign-up" className="text-sm font-semibold mt-10 mb-4 text-center text-gray-100 hover:text-green-800 transition ease-linear">Não tem uma conta? Crie uma agora!</a>
    </form>
}