import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function SignUp(){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    function onSubmit(event: React.FormEvent){ 
        alert("Form submitted")
        event.preventDefault()
    }
    return <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
       <Input required legend="Nome" placeholder="Seu nome" onChange={(e)=>setName(e.target.value)} />
       <Input required legend="E-mail" type="email" placeholder="seu@email.com" onChange={(e)=>setEmail(e.target.value)} />
       <Input required legend="Password" type="password" placeholder="s1234546" onChange={(e)=>setPassword(e.target.value)} />
       <Input required legend="Confirmar a Password" type="password" placeholder="s1234546" onChange={(e)=>setConfirmPassword(e.target.value)} />
       <Button type="submit">Cadastrar</Button>
       <a href="/" className="text-sm font-semibold mt-10 mb-4 text-center text-gray-100 hover:text-green-800 transition ease-linear">Entrar agora!</a>
    </form>
}