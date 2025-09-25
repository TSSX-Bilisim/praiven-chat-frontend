import { useChatFeatureStore } from "@/lib/stores/chatFeature";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

const MaskToggle = ({
  className,
  ...props
}: React.ComponentProps<typeof Button>)  => {
  const { isMasked, toggleMasked } = useChatFeatureStore();
  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn("size-7", className)}
      onClick={() => toggleMasked()}
      {...props}
    >
      {isMasked ? <EyeOff /> : <Eye />}
      <span className="sr-only">Toggle Mask</span>
    </Button>
  );
}

export default MaskToggle;
