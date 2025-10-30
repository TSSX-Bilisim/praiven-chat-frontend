import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Key, Edit, Power, PowerOff } from "lucide-react";
import type { ProviderWithApiKey } from "@/lib/types/provider";

type ProviderCardProps = {
  provider: ProviderWithApiKey;
  onEdit: (provider: ProviderWithApiKey) => void;
  onToggle: (provider: ProviderWithApiKey) => void;
};

export function ProviderCard({ provider, onEdit, onToggle }: ProviderCardProps) {
  const getProviderColor = (name: string) => {
    switch (name) {
      case 'OPENAI':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'CLAUDE':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'GEMINI':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-semibold">{provider.name}</h3>
            <Badge 
              variant={provider.isActive ? "default" : "secondary"}
              className={provider.isActive ? "bg-green-500" : ""}
            >
              {provider.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
          
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              <span className="font-mono">
                {provider.apiKey ? provider.apiKey : 'Not configured'}
              </span>
            </div>
            <div className="text-xs">
              <p>Created: {new Date(provider.createdAt).toLocaleDateString()}</p>
              <p>Updated: {new Date(provider.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className={`p-3 rounded-lg ${getProviderColor(provider.name)} border`}>
          <div className="h-8 w-8 flex items-center justify-center font-bold text-lg">
            {provider.name.charAt(0)}
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onEdit(provider)}
          className="flex-1"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit API Key
        </Button>
        <Button 
          variant={provider.isActive ? "destructive" : "default"}
          size="sm" 
          onClick={() => onToggle(provider)}
          className="flex-1"
        >
          {provider.isActive ? (
            <>
              <PowerOff className="h-4 w-4 mr-2" />
              Deactivate
            </>
          ) : (
            <>
              <Power className="h-4 w-4 mr-2" />
              Activate
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}

