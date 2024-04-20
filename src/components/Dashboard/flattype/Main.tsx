import { Button } from "@/components/ui/button";

export default function PropertyType(){
    return (
        <section className="w-full">
          <div>
            <Button className="w-full mt-3" variant="outline">
              Apartment
            </Button>
          </div>
          <div>
    
            <Button className="w-full mt-3" variant="outline">
              Condominium
            </Button>
          </div>
          <div>
    
            <Button className="w-full mt-3" variant="outline">
            Executive Cond...
            </Button>
          </div>
        </section>
      )
}