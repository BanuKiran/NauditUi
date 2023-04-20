import { Stack, InputAdornment, TextField, MenuItem , Button, Typography} from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';
import { useState, useEffect } from 'react';
import { getRole } from '../../../../redux/slices/role';
import { dispatch, useSelector } from '../../../../redux/store';
import { RoleState } from 'src/@types/role';
import { RHFSelect } from 'src/components/hook-form';
import { fShortenNumber } from 'src/utils/formatNumber';
// ----------------------------------------------------------------------

type Props = {
  isFiltered: boolean;
  optionsRole: any[];
  filterName: string;
  filterRole: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterRole: (event: React.ChangeEvent<HTMLInputElement>) => void;
  icon: string;
  title: string;
  total: number;
  title2: string;
  color?: string;
}



export default function EmployeeTableToolbar({
  isFiltered,
  filterName,
  filterRole,
  onFilterName,
  onFilterRole,
  optionsRole,
  title,
  total,
  title2,
  icon, 
  color,
}: Props) {
  const [dropdownrole, setDropdownRole] = useState(filterName);

  const onChangeRole = (event: any) => {
    setDropdownRole(event.target.value);
  };

  useEffect(() => {
    dispatch(getRole());
  }, []);
  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 2.5, px: 3 }}>
      <TextField 
      
        fullWidth
        select
        label="Role"
        name={dropdownrole}
        value={filterRole}
        onChange={onFilterRole}
        SelectProps={{
          MenuProps: {
            sx: { '& .MuiPaper-root': { maxHeight: 260 } },
          },
        }}
        sx={{
          maxWidth: { sm: 240 },
          textTransform: 'capitalize',
        }}
      >
        {optionsRole.map((option) => (
          <MenuItem
            key={option}
            value={option}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }} 
          >
            {option}
          </MenuItem>
          ))}
        
        </TextField>

        <TextField
        sx= {{width:600}}
        value={filterName}
        onChange= {onFilterName}
        placeholder="Search Employee..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify
                icon={'eva:search-fill'}
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          ),
        }}
      />
      <Stack alignItems="center" justifyContent="center" sx={{ position: 'relative' }}>
        <Iconify icon={icon} sx={{ color, width: 24, height: 24, position: 'absolute' }} />
      </Stack>
      <Stack spacing={0.5} sx={{ ml: 2 }}>
        <Typography variant="h6">{title}</Typography>
          <Typography variant="subtitle2">{fShortenNumber(total)} {title2}
        </Typography>
      </Stack>
    </Stack>
  );
}
