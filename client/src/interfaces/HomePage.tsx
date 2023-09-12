import { useAuth } from "../context/AppContext"
import { appContextIn } from "./contextInterfaces"

function HomePage() {

  const {list} = useAuth() as appContextIn

  console.log(list)

  return (
    <div>home</div>
  )

}

export default HomePage