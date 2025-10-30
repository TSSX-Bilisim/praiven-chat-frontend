import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ProviderWithApiKey } from "@/lib/types/provider";

type ProviderDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  provider?: ProviderWithApiKey | null;
  onSave: (data: { id?: number; name?: string; apiKey: string }) => void;
  mode: 'create' | 'edit';
};

export function ProviderDialog({ open, onOpenChange, provider, onSave, mode }: ProviderDialogProps) {
  const [apiKey, setApiKey] = useState(provider?.apiKey || '');
  const [selectedProvider, setSelectedProvider] = useState<'OPENAI' | 'CLAUDE' | 'GEMINI'>('OPENAI');

  const handleSave = () => {
    if (mode === 'edit' && provider) {
      onSave({ id: provider.id, apiKey });
    } else {
      onSave({ name: selectedProvider, apiKey });
    }
    onOpenChange(false);
    setApiKey('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === 'edit' ? 'Edit Provider API Key' : 'Add New Provider'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'edit' 
              ? 'Update the API key for this provider.'
              : 'Add a new AI provider by entering its API key.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {mode === 'create' && (
            <div className="space-y-2">
              <Label htmlFor="provider">Provider</Label>
              <select
                id="provider"
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value as 'OPENAI' | 'CLAUDE' | 'GEMINI')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="OPENAI">OpenAI</option>
                <option value="CLAUDE">Claude</option>
                <option value="GEMINI">Gemini</option>
              </select>
            </div>
          )}

          {mode === 'edit' && provider && (
            <div className="space-y-2">
              <Label>Provider</Label>
              <div className="text-sm font-medium p-2 bg-muted rounded-md">
                {provider.name}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground">
              Your API key will be securely stored and encrypted.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!apiKey}>
            {mode === 'edit' ? 'Update' : 'Add'} Provider
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

