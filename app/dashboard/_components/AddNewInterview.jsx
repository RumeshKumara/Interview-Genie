"use client";
import React, { useState } from "react";
// Update the import path to the correct location
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/d";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <div>
      <div
        className="p-14 transition-all duration-300 rounded-lg cursor-pointer text-[#5100ff] bg-[#d8cdff] hover:scale-105 hover:shadow-sm dark:bg-[#2a2149] dark:text-[#7433ff] "
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg font-semibold text-center ">
          + Add New Interview
        </h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
