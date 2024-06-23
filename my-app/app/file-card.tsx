import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { DropDownMenu } from "./drop-down-menu"
import { Doc } from "@/convex/_generated/dataModel"
  

export function FileCard ({ file } : { file : Doc<"files"> }) {
    return(
        <Card>
            <CardHeader className="relative">
                <CardTitle className="flex items-center gap-1">
                    {file.name}
                </CardTitle>
                <div className="absolute top-3 right-3">
                      <DropDownMenu file = {file}/>
                </div>
                {/* <CardDescription>Card Description</CardDescription> */}
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
               <Button>Download</Button>
            </CardFooter>
        </Card>

    )
}