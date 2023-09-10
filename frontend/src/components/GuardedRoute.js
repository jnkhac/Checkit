import { Navigate, Outlet } from "react-router-dom"

const GuardedRoute = ({ auth, redirectPath, children }) => {
    setTimeout(null, 1000)
    if (!auth) {
        return <Navigate to={redirectPath} replace />
    }
    return children ? children : <Outlet />
}

export default GuardedRoute