import { Navigate, useLocation } from "react-router"
import okSvg from "../assets/ok.svg"
import { Button } from "../components/Button"
export function Confirm() {
    const location = useLocation()
    if(!location.state?.fromSubmit){
        return <Navigate to="/" />
    }
  return (
    <div className="bg-gray-500 lg:w-[512px] rounded-xl flex flex-col items-center p-10 gap-6">
      <h1 className="text-2xl font-bold text-center text-green-100">Solicitação enviada!</h1>
      <img src={okSvg} alt="Ícone ok" className="w-28" />
      <p className="text-sm text-gray-200 text-center">Aguarde! Sua solicitação será analisada e, em breve, o sector financeiro entrará em contacto com você.</p>
      <a href="/" className="w-full p-3 text-center bg-green-100 rounded-lg text-white hover:bg-green-200 transition esase-lenear">Nova solicitação</a>
    </div>
  );
}