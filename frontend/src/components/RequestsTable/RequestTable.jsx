import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Select, SelectItem, Button } from "@nextui-org/react";
import { instance } from '../../config/AxiosConfig.jsx';

export default function RequestTable() {
  const [requests, setRequests] = useState([]);
  const [selection, setSelection] = useState(null)

  useEffect(() => {
    try {
      const fetchRequests = async () => {
        const response = await instance.get("/request/getRequests");
        setRequests(response.data.requests);
      };
      fetchRequests();
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log(requests);


  const handleSave = async (member) => {
    try {
      const response = await instance.post("/request/editRequest", {member})
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <Table isCompact radius="sm" className="text-black w-full lg:w-2/3" aria-label="Example static collection table">
      <TableHeader>
        <TableColumn className="bg-black">#</TableColumn>
        <TableColumn className="bg-black">WCA ID</TableColumn>
        <TableColumn className="bg-black">NAME</TableColumn>
        <TableColumn className="bg-black">ROLE</TableColumn>
        <TableColumn className="bg-black">STATUS</TableColumn>
        <TableColumn className="bg-black">ACTION</TableColumn>
      </TableHeader>
      <TableBody>
        {requests?.map((member, index) => (
          <TableRow key={index}>
            <TableCell width="20px">{index + 1}</TableCell>
            <TableCell width="50px">{member.wcaid}</TableCell>
            <TableCell className="min-w-[150px]" width="150px">{member.name}</TableCell>
            <TableCell width="200px">
              <Select
                radius="sm"
                className="flex items-center min-w-[170px]"
                labelPlacement="outside-left"
                size="xs"
                label="Role"
                defaultSelectedKeys={[`${member?.role}`]}
                value={member?.role}
                variant="bordered"
                onChange={(e) => selection? setSelection({...selection, role: e.target.value}) : setSelection({...member, role: e.target.value})}
              >
                <SelectItem key="Member" value="Member">Member</SelectItem>
                <SelectItem key="Organiser" value="Organiser">Organiser</SelectItem>
                <SelectItem key="Co-founder" value="Co-founder">Co-founder</SelectItem>
              </Select>
            </TableCell>
            <TableCell width="200px">
              <Select
                radius="sm"
                className="flex items-center min-w-[150px]"
                labelPlacement="outside-left"
                size="xs"
                label="Status"
                variant="bordered"
                defaultSelectedKeys={[`${member?.status}`]}
                onChange={(e) => selection? setSelection({...selection, status: e.target.value}) : setSelection({...member, status: e.target.value})}
                value={member?.status}
              >
                <SelectItem key="Active" value="Active">Active</SelectItem>
                <SelectItem key="Inactive" value="Inactive">Inactive</SelectItem>
              </Select>
            </TableCell>
            <TableCell width="50px">
              <div className="flex justify-evenly gap-2 lg:gap-0">
                <Button onClick={() => handleSave({...member, role: selection?.role, status: selection?.status})} className="bg-green-900 text-white" size="sm">Save</Button>
                <Button className="bg-red-900 text-white" size="sm">Delete</Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}




