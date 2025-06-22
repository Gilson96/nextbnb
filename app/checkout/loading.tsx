import { Loader2 } from "lucide-react";

const loading = () => {
    return (
        <div className="flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
}

export default loading;