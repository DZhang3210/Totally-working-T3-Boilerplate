"use client";
import { Button } from "@/components/ui/button";
import React from "react";
// import { deleteProduct } from "../_actions/ProductFormActions";

const DeleteButton = ({ id }: { id: string }) => {
  return (
    <Button
      //   onClick={() => deleteProduct({ id })}
      className="bg-destructive text-xl"
    >
      Delete Me
    </Button>
  );
};

export default DeleteButton;
