import { classMerge } from "../utils/classMerge"

type Props = React.ComponentProps<"button"> & {
    isLoading?: boolean
    variant?: "base" | "icon" | "iconSmall"
}
const variants ={
    button:{
        base:"h-12",
        icon:"h-12 w-12",
        iconSmall:"h-8 w-8",
    }
}
export function Button({isLoading, 
    children,
    className,
    type="button", 
    variant="base", ...rest}: Props) {
    return(
        <button type={type} disabled={isLoading} 
        className={
        classMerge([
           "flex items-center justify-center gap-2 rounded-lg bg-green-100 text-white cursor-pointer text-sm hover:bg-green-200 transition ease-initial  disabled:opacity-50 ",isLoading && "cursor-not-allowed",variants.button[variant],className
        ])}  
         {...rest}>
             {children}
        </button>
    )
}