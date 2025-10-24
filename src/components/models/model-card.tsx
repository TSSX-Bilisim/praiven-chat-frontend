import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cpu, DollarSign, TrendingUp } from "lucide-react";
import type { ModelWithProvider } from "@/lib/types/provider";

type ModelCardProps = {
  model: ModelWithProvider;
  onToggle: (model: ModelWithProvider) => void;
};

export function ModelCard({ model, onToggle }: ModelCardProps) {
  const getProviderColor = (name: string) => {
    switch (name) {
      case 'OPENAI':
        return 'text-green-500';
      case 'CLAUDE':
        return 'text-purple-500';
      case 'GEMINI':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  const formatPrice = (price?: number) => {
    if (!price) return 'N/A';
    return `$${price.toFixed(6)}/token`;
  };

  const formatLimit = (limit?: number) => {
    if (!limit) return 'N/A';
    return `${(limit / 1000000).toFixed(1)}M tokens`;
  };

  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold">{model.name}</h3>
              <Badge 
                variant={model.isActive ? "default" : "secondary"}
                className={model.isActive ? "bg-green-500" : ""}
              >
                {model.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
            <p className={`text-sm font-medium ${getProviderColor(model.providerName)}`}>
              {model.providerName}
            </p>
          </div>
          <div className="p-2 rounded-lg bg-secondary">
            <Cpu className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        {/* Description */}
        {model.description && (
          <p className="text-sm text-muted-foreground">
            {model.description}
          </p>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 py-3 border-t border-b">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <DollarSign className="h-3 w-3" />
              <span>Price per token</span>
            </div>
            <p className="text-sm font-medium">{formatPrice(model.pricePerToken)}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              <span>Default limit</span>
            </div>
            <p className="text-sm font-medium">{formatLimit(model.defaultLimit)}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Updated: {new Date(model.updatedAt).toLocaleDateString()}</span>
          <Button
            variant={model.isActive ? "outline" : "default"}
            size="sm"
            onClick={() => onToggle(model)}
          >
            {model.isActive ? "Deactivate" : "Activate"}
          </Button>
        </div>
      </div>
    </Card>
  );
}

