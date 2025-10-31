export function StatsSection() {
  const stats = [
    {
      value: "2,500+",
      label: "Verified Companions",
    },
    {
      value: "28 min",
      label: "Avg Response Time",
    },
    {
      value: "99.2%",
      label: "Satisfaction Rate",
    },
    {
      value: "50,000+",
      label: "Happy Clients",
    },
  ]

  return (
    <section className="py-12 border-t bg-muted/30">
      <div className="container px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
