import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function PdfPageLoading() {
  return (
    <div className="container mx-auto">
      <Skeleton className="h-9 w-48 mb-6" />
      
      <div className="flex items-start gap-4 mb-6">
        <Skeleton className="h-10 w-10 rounded-md" />
        <div>
          <Skeleton className="h-9 w-80 mb-2" />
          <Skeleton className="h-5 w-64" />
        </div>
      </div>

      <Card>
        <CardHeader>
           <div className="flex space-x-1">
             <Skeleton className="h-10 w-1/2" />
             <Skeleton className="h-10 w-1/2" />
           </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
