import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, TableCell, MenuItem, Link, Button, IconButton } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @types
import { UserManager } from '../../../@types/user';
// components
import Iconify from '../../../components/Iconify';
import { TableMoreMenu } from '../../../components/table';
import { HRStatus } from '../../../@types/hrstatus';
import { capitalCase } from 'change-case';

import hrproject from 'src/redux/slices/hrproject';

import { HRStatusRequest } from '../../../@types/hrstatus';

import ProjectCreate from 'src/pages/audit/hr/project/ProjectCreate';
import { PATH_DASHBOARD } from 'src/routes/paths';
import ConfirmDialog from '../../../components/confirm-dialog';
import MenuPopover from 'src/components/menu-popover';
// ----------------------------------------------------------------------

type Props = {
  row: HRStatus;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function HRStatusTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const theme = useTheme();

  const {
    id,
    name,
    title,
    description,
    task,
    attachments,
    workDate,
    startTime,
    endTime,
    durations,
    tags,
  } = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
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
      <TableCell align="left">{capitalCase(id)}</TableCell>
      <TableCell align="left"><Link href={'http://localhost:3000/dashboard/hr/c650688c-4578-4088-8dfc-30f725e430e0/statusedit'}>{capitalCase(name)}</Link></TableCell>
      <TableCell align="left">{capitalCase(title)}</TableCell>
      <TableCell align="left">{capitalCase(description)}</TableCell>
      {/* <TableCell align="left">{hrproject.name}</TableCell> */}
      <TableCell align="left">{capitalCase(task)}</TableCell>
      <TableCell align="left">{capitalCase(attachments)}</TableCell>
      <TableCell align="left">{workDate}</TableCell>
      <TableCell align="left">{startTime}</TableCell>
      <TableCell align="left">{endTime}</TableCell>
      <TableCell align="left">{durations}</TableCell>

      <TableCell align="left">{tags}</TableCell>
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
        content={<> Are you sure want to delete <strong> {name} </strong>  {workDate} ?</>}
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </TableRow>
  );
}
