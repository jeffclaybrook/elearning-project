import { ReactNode } from "react"

const AuthLayout = ({ children }: { children: ReactNode }) => (
 <div className="h-full flex items-center justify-center">
  {children}
 </div>
)

export default AuthLayout