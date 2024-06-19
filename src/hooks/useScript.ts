import { useEffect } from "react";

const useScript = (source: string) => {
    useEffect(() => {
            const script = document.createElement('script');
            script.src = source;
            script.async = true;
    
            document.body.appendChild(script);
    
            return () => {
                document.body.removeChild(script);
            }
      }, []);
}

export default useScript