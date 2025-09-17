'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "../ui/input";
import { useState } from "react";
import { Flex } from "@radix-ui/themes";
import { DialogClose } from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { Button } from "../ui/button";

interface SearchDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function SearchDialog({ open, setOpen }: SearchDialogProps) {
    const [search, setSearch] = useState("");

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent showCloseButton={false} className="py-2 px-4 gap-0">
                <DialogHeader>
                    <DialogTitle className="hidden">Search Chats</DialogTitle>
                </DialogHeader>
                <Flex direction={'row'}>
                <Input
                    placeholder="Type to search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border-none outline-none focus-visible:ring-0 focus-visible:border-0 mr-4 dark:bg-input/0"
                />
                <DialogClose asChild>
                    <Button variant={"ghost"} size={"icon"} className="opacity-70 hover:opacity-100 rounded-full">
                    <XIcon />
                    </Button>
                </DialogClose>
                </Flex>
            </DialogContent>
        </Dialog>
    );
}