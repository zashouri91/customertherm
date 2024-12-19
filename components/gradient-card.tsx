import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface GradientCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string
  description: string
  icon: React.ReactNode
  gradientFrom: string
  gradientTo: string
}

export function GradientCard({
  title,
  value,
  description,
  icon,
  gradientFrom,
  gradientTo,
  className,
  ...props
}: GradientCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden",
        className
      )}
      {...props}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br opacity-10"
        style={{
          background: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})`
        }}
      />
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
