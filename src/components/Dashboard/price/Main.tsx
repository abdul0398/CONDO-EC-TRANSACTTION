import { Button } from "@/components/ui/button";

export default function Price() {
  return (
    <section className="w-full">
      <div>
        <Button className="w-full mt-3 text-xs" variant="outline">
          &lt; 5m$
        </Button>
      </div>
      <div>

        <Button className="w-full mt-3 text-xs" variant="outline">
          5m$ - 20m$
        </Button>
      </div>
      <div>

        <Button className="w-full mt-3 text-xs" variant="outline">
            20m$ - 40m$
        </Button>

      </div>
      <div>

        <Button className="w-full mt-3 text-xs" variant="outline">
            &gt; 40m$
        </Button>

      </div>
    </section>
  )
}