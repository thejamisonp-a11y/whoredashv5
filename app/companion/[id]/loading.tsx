export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="aspect-[16/9] bg-muted rounded-lg" />
            <div className="h-32 bg-muted rounded" />
          </div>
          <div className="lg:col-span-1">
            <div className="h-96 bg-muted rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}
