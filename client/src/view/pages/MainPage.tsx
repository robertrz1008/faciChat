import React from 'react'
import {Navigate} from "react-router-dom"

function MainPage() {
    return <Navigate to={"/chat"} replace/>
}

export default MainPage