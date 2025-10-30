import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

type StatsCardProps = {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  gradient: string;
  iconBg: string;
};

export function StatsCard({ title, value, description, icon: Icon, gradient, iconBg }: StatsCardProps) {
  return (
    <Card className={`relative overflow-hidden p-6 border-0 ${gradient} hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}>
      {/* Decorative background pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10 transform translate-x-8 -translate-y-8">
        <Icon className="w-full h-full" />
      </div>
      
      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-white/90 mb-2">{title}</p>
          <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
          {description && (
            <p className="text-xs text-white/80">{description}</p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${iconBg} shadow-lg`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </Card>
  );
}

