import { useEffect, useState } from "react"
import { AxiosError } from "axios"

import { api } from "../services/api"

import searchSvg from "../assets/search.svg"
import { CATEGORIES } from "../utils/categories"

import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { RefundItem, RefundItemProps } from "../components/RefundItem"
import { formatCurrency } from "../utils/formatCurrency"
import { Pagination } from "../components/Pagination"

const REFUND_EXAMPLE = {
    id: "123456",
    name: "Francisco",
    category: "Transporte",
    amount: formatCurrency(99.46),
    categoryImg: CATEGORIES["transport"].icone
}
const PER_PAGE=5
export function Dashboard() {
    const [name, setName] = useState("")
    const [page, setPage] = useState(1)
    const [totalPage, settotalPage] = useState(0)
    const [refunds, setRefunds] = useState<RefundItemProps[]>([])
        
    function handlePagination(action: "next" | "previous") {
      setPage((prev) => {  
        if (action === "next" && prev < totalPage) {
          return prev + 1
        } 
        if (action === "previous" && prev > 1) {
          return prev - 1
        }
        return prev
    })
  }
    function handlePageChange(page: number) {
        if (page > totalPage) {
            setPage(totalPage)
            return
        }
        if (page < 1) {
            setPage(1)
            return
        }
        
      }
   async function fetchRefunds() {
      try {
        const response = await api.get<RefundsPaginationAPIResponse>(`/refunds?name=${name.trim()}&page=${page}&perPage=${PER_PAGE}`)
        setRefunds(
          response.data.refunds.map((refund) => ({
            id:refund.id,
            name: refund.user.name,
            description: refund.name,
            amount: formatCurrency(refund.amount),
            categoryImg: CATEGORIES[refund.category].icone
          }))
        )
        settotalPage(response.data.pagination.totalPages)

      } catch (error) {
        console.log(error)
        if(error instanceof AxiosError){
          return alert(error.response?.data.message)
        }
        alert("Não foi possivel Carregar")
    }
  }
  function onSubmit(e:React.FormEvent){
    e.preventDefault()
    fetchRefunds()
  }
    useEffect(()=>{
      fetchRefunds()
    },[page])


  return (
    <div className="bg-gray-500 md:min-w-[768px] rounded-xl p-10 ">
      <h1 className="text-xl font-bold flex-1 text-green-100">Solicitações</h1>
      <form onSubmit={onSubmit} className="flex flex-1 items-center justify-between pb-6 border-b-[1px] border-b-gray-400 md:flex-row gap-2 mt-6">
        <Input placeholder="Pesquisar pelo nome" onChange={(e)=>{setName(e.target.value)}}/>
        <Button  variant="icon" type="submit">
            <img src={searchSvg} alt="search" className="w-5" />
        </Button>
      </form>
      <div className="flex flex-col gap-4 my-6 max-h-[342px] overflow-y-scroll">
        {
          refunds.map((refund) => (
            <RefundItem key={refund.id} data={refund} href={`/refund/${refund.id}`} />
          ))
        }
        
      </div>
      <Pagination
        current={page}
        total={totalPage}
        onNext={() => handlePagination("next")}
        onPrevious={() => handlePagination("previous")}
      />
    </div>
  );
}