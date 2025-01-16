import React, { useState, useEffect } from 'react';
import { Modal, Button, TextField, Box } from '@mui/material';
import { User } from '../interfaces/users';
import axiosInstance from '../api/axios';

interface AddEditUserModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  user?: User | null;
}

const AddEditUserModal: React.FC<AddEditUserModalProps> = ({
  visible,
  onClose,
  onSave,
  user,
}) => {
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const isEditMode = !!user;

  useEffect(() => {
    if (user) {
      setFirstName(user?.firstName || '');
      setLastName(user?.lastName || '');
      setEmail(user.email);
      setPhoneNumber(user.phoneNumber);
    } else {
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhoneNumber('');
    }
  }, [user]);

  const handleSave = async () => {
    if (email && phoneNumber) {
      const userToSave = { ...user, firstName, lastName, email, phoneNumber };
      console.log('user', userToSave);
      if (isEditMode) {
        await axiosInstance.put('users', userToSave);
      } else {
        console.log('in else');
        await axiosInstance.post('users', userToSave);
      }

      onSave();

      setFirstName('');
      setLastName('');
      setEmail('');
      setPhoneNumber('');
    }
  };

  return (
    <Modal open={visible} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2>{isEditMode ? 'Edit User' : 'Add User'}</h2>
        <TextField
          fullWidth
          label='First Name'
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          margin='normal'
        />
        <TextField
          fullWidth
          label='Last Name'
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          margin='normal'
        />
        <TextField
          fullWidth
          label='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          margin='normal'
          required
          type='email'
        />
        <TextField
          fullWidth
          label='Phone Number'
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
          margin='normal'
          required
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={onClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button variant='contained' color='primary' onClick={handleSave}>
            {isEditMode ? 'Save Changes' : 'Add User'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddEditUserModal;
