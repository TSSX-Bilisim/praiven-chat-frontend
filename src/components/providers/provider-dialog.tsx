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
  isLoading?: boolean;
};

export function ProviderDialog({ open, onOpenChange, provider, onSave, mode, isLoading = false }: ProviderDialogProps) {
  const [apiKey, setApiKey] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<'OPENAI' | 'CLAUDE' | 'GEMINI'>('OPENAI');

  // Reset API key when dialog opens/closes or provider changes
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setApiKey('');
    }
    onOpenChange(newOpen);
  };

  const handleSave = () => {
    if (mode === 'edit' && provider) {
      onSave({ id: provider.id, apiKey });
    } else {
      onSave({ name: selectedProvider, apiKey });
    }
    // Don't close dialog here - let the parent handle it after successful save
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === 'edit' ? 'Edit Provider API Key' : 'Add New Provider'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'edit' 
              ? 'Enter a new API key for this provider. This will update the provider configuration and refresh available models.'
              : 'Add a new AI provider by entering its API key. Models will be automatically imported from the provider.'}
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
            <Label htmlFor="apiKey">
              {mode === 'edit' ? 'New API Key' : 'API Key'}
            </Label>
            <Input
              id="apiKey"
              type="password"
              placeholder={mode === 'edit' ? 'Enter new API key...' : 'sk-...'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground">
              {mode === 'edit' 
                ? 'The API key will be validated before updating.'
                : 'Your API key will be securely stored and validated.'}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!apiKey || isLoading}>
            {isLoading ? 'Saving...' : mode === 'edit' ? 'Update API Key' : 'Add Provider'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

