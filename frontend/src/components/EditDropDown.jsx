import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { CiMenuKebab } from "react-icons/ci";


export default function EditDropDown() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="border-none bg-transparent">
          <CiMenuKebab/>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="success" className="text-success" color="success">
          Save
        </DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
