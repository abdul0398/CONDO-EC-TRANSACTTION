import { Button } from "@/components/ui/button";

export default function Areas() {
  return (
    <section className="w-full">
      <div>
        <Button className="w-full mt-3 text-xs" variant="outline">
          &lt; 1000 sqft
        </Button>
      </div>
      <div>

        <Button className="w-full mt-3 text-xs" variant="outline">
          1000-5000 sqft
        </Button>
      </div>
      <div>

        <Button className="w-full mt-3 text-xs" variant="outline">
          5000 <br/>
          -
          10000 sqft
        </Button>

      </div>
      <div>

        <Button className="w-full mt-3 text-xs" variant="outline">
          &gt; 10000 sqft
        </Button>

      </div>
    </section>
  )
}