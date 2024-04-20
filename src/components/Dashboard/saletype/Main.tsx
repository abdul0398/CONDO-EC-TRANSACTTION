import { Button } from "@/components/ui/button";

export default function Saletype() {
  return (
    <section className="w-full">
      <div>
        <Button className="w-full mt-3" variant="outline">
          New Sale
        </Button>
      </div>
      <div>

        <Button className="w-full mt-3" variant="outline">
          Resale
        </Button>
      </div>
      <div>

        <Button className="w-full mt-3" variant="outline">
          Sub Sale
        </Button>
      </div>
    </section>
  )
}