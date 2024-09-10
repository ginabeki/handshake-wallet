import { useAppSelector } from "@/lib/state/hooks";
import { useEffect } from "react";

const AuthWrapper = () => {
    const { status } = useAppSelector((state) => state.auth);

    return (
        <div></div>
    )
}

export default AuthWrapper;