import { useState } from "react"
import { useNavigate, useParams } from "react-router"
import { CATEGORIES, CATEGORIES_KEYS } from "../utils/categories"
import fileSvg from "../assets/file.svg"
import { Input } from "../components/Input"
import { Select } from "../components/Select"
import { Upload } from "../components/Upload"
import { Button } from "../components/Button"
export function Refund(){
    const [filename, setFilename] = useState<File | null>(null)
    const [name, setName] = useState("")
    const [amount, setAmount] = useState("")
    const [category, setCategory] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const params = useParams<{id:string}>()
    function onSubmit(event: React.FormEvent){
        event.preventDefault()
        if(params.id){
           return navigate(-1)
        }
        alert("Solicitação de reembolso enviada com sucesso!")
        navigate("/confirm",{state:{fromSubmit:true}})
    }
    return <form onSubmit={onSubmit} className="bg-gray-500 w-full rounded-xl flex flex-col p-10 gap-6 lg:min-w-[512px]">
        <header>
            <h1 className="text-xl font-bold text-gray-100">Solicitação de reembolso</h1>
            <p className="text-sm text-gray-200 mt-2 mb-4">Dados da despesa para solictar reembolso.</p>
        </header>
        <Input
            required
            legend="Nome da solicitação"
            placeholder="Digite o nome da solicitação"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            disabled={!!params.id}
        />
        <div className="flex gap-4">
        <Select required legend="Nome da solicitação" disabled={!!params.id} value={category} onChange={(e)=>setCategory(e.target.value)}>
          {
            CATEGORIES_KEYS.map((category)=>(
                <option key={category} value={category}>
                    { CATEGORIES[category].name }
                </option>

            ))
          }
        </Select>
        <Input
            required
            legend="Valor"
            placeholder="Digite o valor da solicitação"
            value={amount}
            onChange={(e)=>setAmount(e.target.value)}
            type="number"
            disabled={!!params.id}/>
        </div>
        {
            params.id ? <a href={`https://www.google.com.br/search?q=${params.id}`} 
            className="text-sm text-gray-100 font-semibold flex items-center justify-center gap-2 my-6 hover:opacity-70 transition ease-linear underline" 
            target="_blank">
            <img src={fileSvg} alt="file" className="w-4 mr-2"/>
                Abrir comprovante</a> : 
            <Upload
            filename={filename && filename.name}
            required
            disabled={!!params.id}
            accept=".jpg, .jpeg, .png, .pdf"
            onChange={(e)=> e.target.files && setFilename(e.target.files[0])}
            />
        }
        
       
        <Button type="submit" isLoading={isLoading} >
           { params.id ? "Voltar" : "Solicitar reembolso"}
        </Button>
    </form>
}