import { cn } from "@/lib/utils"
import { ReactNode } from "react"


interface IProps {
  className?: string
  children: ReactNode
}

const MaxWidthWrapper = ({ className, children }: IProps) => {
  return <>
    <div className={cn(`mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64`, className)}>
      {children}
    </div>
  </>
}

export default MaxWidthWrapper