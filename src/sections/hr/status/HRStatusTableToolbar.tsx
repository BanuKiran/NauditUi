import { Stack, InputAdornment, TextField, Button, Typography } from '@mui/material';
import { DatePicker, LoadingButton } from '@mui/lab';
import { Controller, useForm } from 'react-hook-form';
// components
import Iconify from '../../../components/Iconify';
import { fShortenNumber } from 'src/utils/formatNumber';

// ----------------------------------------------------------------------

type Props = {
  isFiltered:boolean,
  filterName: string;
  onChangeFilter:VoidFunction;
  onFilterName: (value: string) => void;
  icon: string;
  title: string;
  total: number;
  title2: string;
  color?: string;
};

export default function HRStatusTableToolbar({
  filterName,
  isFiltered,
  onFilterName,
  onChangeFilter,
  title,
  total,
  title2,
  icon, 
  color,
}: Props) {
  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 2.5, px: 3 }}>
      <TextField
        sx= {{width:900}}
        value={filterName}
        onChange={(event) => onFilterName(event.target.value)}
        placeholder="Search Status..."
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
        <Button
          variant='contained'
          sx={{ flexShrink: 0 }}
          onClick= {onChangeFilter}
        >
          Clear
        </Button>
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
