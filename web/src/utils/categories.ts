import foodSvg from "../assets/food.svg"
import othersSvg from "../assets/others.svg"
import servicesSvg from "../assets/services.svg"
import transportSvg from "../assets/transport.svg"
import accommodationSvg from "../assets/accommodation.svg"

export const CATEGORIES = {
    food:{
        name:"Alimentação",
        icone: foodSvg
    },
    others:{
        name:"Outros",
        icone: othersSvg
    },
    services:{
        name:"Serviços",
        icone: servicesSvg
    },
    transport:{
        name:"Transporte",
        icone: transportSvg
    },
    accommodation:{
        name:"Hospedagem",
        icone: accommodationSvg
    }
}

export const CATEGORIES_KEYS = Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>