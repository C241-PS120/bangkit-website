import { useEffect } from "react";

const useScript = (source: Array<string>) => {
    useEffect(() => {
        source.forEach((src) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
    
            document.body.appendChild(script);
    
            return () => {
            document.body.removeChild(script);
            }
        })
      }, [source]);
}

export default useScript