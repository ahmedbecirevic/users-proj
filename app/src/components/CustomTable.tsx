// mui reusable table
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { User } from '../interfaces/users';
import axiosInstance from '../api/axios';
import AddEditUserModal from './AddEditUserModal';

const CustomTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getAllUsers = async () => {
    const data = await axiosInstance.get('users');
    setUsers(data?.data as User[]);
  };

  useEffect(() => {
    (async () => {
      await getAllUsers();
    })();
  }, []);
  return (
    <>
      <Paper>
        <TableContainer>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
            }}
          >
            <h2>Users</h2>
            <button
              onClick={() => {
                setUserToEdit(null);
                setIsModalOpen(true);
              }}
            >
              Create User
            </button>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row?.firstName || 'NA'}</TableCell>
                    <TableCell>{row?.lastName || 'NA'}</TableCell>
                    <TableCell>{row.phoneNumber}</TableCell>
                    <TableCell>
                      <button
                        onClick={() => {
                          setUserToEdit(row);
                          setIsModalOpen(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={async () => {
                          await axiosInstance.delete(`users/${row.id}`);
                          await getAllUsers();
                        }}
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <AddEditUserModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={() => {
          getAllUsers();
          setIsModalOpen(false);
        }}
        user={userToEdit}
      />
    </>
  );
};

export default CustomTable;
