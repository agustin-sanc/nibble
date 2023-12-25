"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_common/components/dialog";
import { Button } from "@/app/_common/components/button";
import { Label } from "@/app/_common/components/label";
import { Input } from "@/app/_common/components/input";
import { CopyIcon } from "lucide-react";
import { saveCourse } from "@/app/(authed)/(common-layout)/courses/save-course";

export const CreateCourseDialog = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button>Crear curso</Button>
    </DialogTrigger>

    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Crear curso</DialogTitle>

        <DialogDescription>
          Anyone who has this link will be able to view this.
        </DialogDescription>
      </DialogHeader>

      <div className="flex items-center space-x-2">
        <div className="grid flex-1 gap-2">
          <Label htmlFor="link" className="sr-only">
            Link
          </Label>

          <Input
            id="link"
            defaultValue="https://ui.shadcn.com/docs/installation"
            readOnly
          />
        </div>
        <Button type="submit" size="sm" className="px-3">
          <span className="sr-only">Copy</span>
          <CopyIcon className="h-4 w-4" />
        </Button>
      </div>

      <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <Button type="button" variant="secondary" onClick={saveCourse}>
            Crear curso
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
