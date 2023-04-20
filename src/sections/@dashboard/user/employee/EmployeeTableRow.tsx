import { useState } from 'react';
// @mui
import { TableRow, TableCell, Typography, MenuItem, Button, IconButton } from '@mui/material';
// @types
import { UserManager } from '../../../../@types/user';
// components
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import ConfirmDialog from '../../../../components/confirm-dialog';
import MenuPopover from 'src/components/menu-popover';
import './Employee.css';
// ----------------------------------------------------------------------

type Props = {
  color: string;
  row: UserManager;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  onViewRow: VoidFunction;
};

export default function EmployeeTableRow({
  color,
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {

  const { firstName, lastName, role, email, employeeId, mobile, joinDate } = row;
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const[roleColor, setRoleColor] = useState('')

  const [openConfirm, setOpenConfirm] = useState(false);

  const handleFilterRole = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRoleColor(event.target.value);
 };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

   const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <TableRow hover selected={selected}>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle2" noWrap>
          {firstName + ' ' + lastName}
        </Typography>
      </TableCell>

      <TableCell align="left">{employeeId}</TableCell>
      <TableCell align="left">{email}</TableCell>
      <TableCell align="left">{mobile}</TableCell>
      <TableCell align="left">{joinDate}</TableCell>
      <TableCell align="left" className="datarow" sx={{ textTransform: 'capitalize', color }} color={roleColor === 'ROLE_USER' ? 'orange' : '' || roleColor === 'ROLE_SUPER_ADMIN'? 'green' : '' || roleColor === 'ROLE_ADMIN'? 'yellow' : '' || roleColor === 'all'? 'violet' : ''}>{role}</TableCell>

      <TableCell align="right">
        <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
             <MenuPopover
             open={openPopover}
            onClose={handleClosePopover}
            arrow="right-top"
           sx={{ width: 140 }}
           >
              <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={<>Are you sure want to delete <strong> {firstName} {lastName} </strong>  ?</>}
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </TableRow>
  );
}
