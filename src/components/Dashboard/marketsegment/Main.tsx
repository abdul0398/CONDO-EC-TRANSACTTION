import { Button } from "@/components/ui/button";

export default function MarketSegment() {
  return (
    <section className="w-full">
      <div>
        <Button className="w-full mt-3" variant="outline">
          CCR
        </Button>
      </div>
      <div>

        <Button className="w-full mt-3" variant="outline">
          OCR
        </Button>
      </div>
      <div>

        <Button className="w-full mt-3" variant="outline">
          RCR
        </Button>
      </div>
    </section>
  )
}