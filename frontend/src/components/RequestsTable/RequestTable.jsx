import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Select, SelectItem, Button } from "@nextui-org/react";
import { instance } from '../../config/AxiosConfig.jsx';
import { useSnackbar } from 'notistack';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { Navigate } from "react-router-dom";


export default function RequestTable({ requests }) {

  const [selection, setSelection] = useState(null)
  const { enqueueSnackbar } = useSnackbar()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('user')))

  const userID = import.meta.env.VITE_ADMIN_USER_ID

  useEffect(() => {
    if(user){
      user.userID === userID ? null : <Navigate to={"/"}/>
    }
  }, [])

  const handleSave = async (member) => {
    try {
      const response = await instance.post("/request/editRequest", { member })
      if (response.data.status === 200) {
        enqueueSnackbar(response.data.message, { variant: 'success' });
        setTimeout(() => {
          window.location.reload()
        }, 1000);
        return
      }
      enqueueSnackbar(response.data.message, { variant: 'error' });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error, { variant: 'error' });
    }
  }


  const handleDelete = async (member) => {
    console.log(member);
    try {
      const deleteResponse = await instance.post("/members/deleteMember", { member })
      if (deleteResponse.data.status === 200) {
        enqueueSnackbar(deleteResponse.data.message, { variant: 'success' });
        setTimeout(() => {
          window.location.reload()
        }, 1000);
        return
      }
      enqueueSnackbar(deleteResponse.data.message, { variant: 'error' });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error, { variant: 'error' });
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
            <TableCell className="border-b-1 border-b-zinc-700" width="20px">{index + 1}</TableCell>
            <TableCell className="border-b-1 border-b-zinc-700" width="50px">{member.wcaid}</TableCell>
            <TableCell className="min-w-[170px] border-b-1 border-b-zinc-700" width="150px">{member.name}</TableCell>
            <TableCell className="border-b-1 border-b-zinc-700" width="200px">
              <Select aria-label="role"
                radius="sm"
                className="min-w-[170px]"
                size="xs"
                defaultSelectedKeys={[`${member?.role}`]}
                value={member?.role}
                variant="bordered"
                onChange={(e) => selection ? setSelection({ ...selection, role: e.target.value }) : setSelection({ ...member, role: e.target.value })}
              >
                <SelectItem key="Member" value="Member">Member</SelectItem>
                <SelectItem key="Organiser" value="Organiser">Organiser</SelectItem>
                <SelectItem key="Co-founder" value="Co-founder">Co-founder</SelectItem>
              </Select>
            </TableCell>
            <TableCell className="border-b-1 border-b-zinc-700" width="200px">
              <Select aria-label="status"
                radius="sm"
                className="flex items-center min-w-[130px]"
                size="xs"
                variant="bordered"
                defaultSelectedKeys={[`${member?.status}`]}
                onChange={(e) => selection ? setSelection({ ...selection, status: e.target.value }) : setSelection({ ...member, status: e.target.value })}
                value={member?.status}
              >
                <SelectItem key="Active" value="Active">Active</SelectItem>
                <SelectItem key="Inactive" value="Inactive">Inactive</SelectItem>
              </Select>
            </TableCell>
            <TableCell className="border-b-1 border-b-zinc-700" width="50px">
              <div className="flex justify-evenly gap-2 lg:gap-0">
                <Button onClick={() => handleSave({ ...member, role: selection?.role, status: selection?.status })} className="bg-success-700 text-white" size="sm">Save</Button>
                <Button onPress={onOpen} className="bg-red-900 text-white" size="sm">Delete</Button>
                <Modal
                  className='rounded-md bg-gray-200'
                  isOpen={isOpen}
                  placement="top-bottom"
                  onOpenChange={onOpenChange}
                >
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">Are you sure?</ModalHeader>
                        <ModalFooter>
                          <div className="flex w-full gap-3">
                            <Button className="bg-success-700 text-white w-1/2" color="success" onPress={onClose}>
                              Close
                            </Button>
                            <Button onClick={() => handleDelete(member)} className="bg-red-800 w-1/2 text-white" onPress={onClose}>
                              Delete
                            </Button>
                          </div>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}




