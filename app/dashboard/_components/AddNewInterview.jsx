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
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";

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
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl ">
              Tell us more about Job you are interview
            </DialogTitle>
            <DialogDescription>
              <form action="">
                <div>
                  <h2>
                    Add Details about job position/role, You skills and Yer of
                    experience
                  </h2>

                  <div className="flex flex-col gap-2 my-3 mt-7">
                    <label htmlFor="" className="text-black dark:text-white ">
                      Job Role/Job Position
                    </label>
                    <Input placeholder="Ex. Full Stack Developer" />
                  </div>
                  <div className="flex flex-col gap-2 my-3 mt-7">
                    <label htmlFor="" className="text-black dark:text-white ">
                      Job Description/ Tech Stack (In Short)
                    </label>
                    <Textarea placeholder="Ex. React, Angular, NodeJs, MySQL" />
                  </div>
                  <div className="flex flex-col gap-2 my-3 mb-7 mt-7">
                    <label htmlFor="" className="text-black dark:text-white ">
                      Years of Experience
                    </label>
                    <Input placeholder="5" type="number" />
                  </div>
                </div>
                <div className="flex justify-end gap-5 ">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    className="transition-all duration-300 hover:scale-105"
                  >
                    Start Interview
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
