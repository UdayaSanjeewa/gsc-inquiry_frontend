import { Button } from "@/components/ui/button";
import React from "react";

function SubmitButton(props) {
  const { title, type } = props;

  return (
    <Button
      className="transition-all duration-300 bg-blue-700 hover:bg-blue-600 w-[30%]"
      type={type}
    >
      {title}
    </Button>
  );
}

export default SubmitButton;
