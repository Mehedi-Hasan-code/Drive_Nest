import { useEffect } from "react"

const useDocumentTitle = (title) => {
    useEffect(() => {
        const originalTitle = document.title;
        document.title = title
        return () => {
            document.title = originalTitle
        }
    },[title])
}
export default useDocumentTitle