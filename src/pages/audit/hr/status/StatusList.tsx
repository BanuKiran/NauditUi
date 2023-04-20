import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
  Box,
  Card,
  Table,
  Button,
  TableBody,
  Container,
  TableContainer,
  TablePagination,
  Stack,
  Divider,
  useTheme,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useTable, { getComparator, emptyRows } from '../../../../hooks/useTable';

// components
import Page from '../../../../components/Page';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import { TableNoData, TableEmptyRows, TableHeadCustom } from '../../../../components/table';
import ConfirmDialog from '../../../../components/confirm-dialog';
// sections
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { useSelector } from 'react-redux';

import { dispatch } from '../../../../redux/store';
import { deleteHRStatus, getHRStatus } from '../../../../redux/slices/hrstatus';
import { HRStatus, HRStatusState } from '../../../../@types/hrstatus';
import useSettings from 'src/hooks/useSettings';
import HRStatusAnalytic from 'src/sections/hr/status/HRStatusAnalytic';
import HRStatusTableToolbar from 'src/sections/hr/status/HRStatusTableToolbar';
import HRStatusTableRow from 'src/sections/hr/status/HRStatusTableRow';

const TABLE_HEAD = [
  { id: 'id', label: 'ID', align: 'left' },
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'title', label: 'Title', align: 'left' },
  { id: 'description', label: 'Description', align: 'left' },
  { id: 'task', label: 'Task', align: 'left' },
  { id: 'attachments', label: 'Attachments', align: 'left' },
  { id: 'workdate', label: 'Work Date', align: 'left' },
  { id: 'startTime', label: 'Start Time', align: 'left' },
  { id: 'endTime', label: 'End Time', align: 'left' },
  { id: 'durations', label: 'Durations', align: 'left' },
  { id: 'tags', label: 'Tags', align: 'left' },
  { id: 'actions', label: 'Actions', align: 'left' },
];

// ----------------------------------------------------------------------

export default function HRStatusList() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    //
    onSort,

    onChangePage,
    onChangeRowsPerPage,
  } = useTable();
  const theme = useTheme();
  const { themeStretch } = useSettings();

  const navigate = useNavigate();

  const { hrStatuses } = useSelector((state: { hrstatus: HRStatusState }) => state.hrstatus);
  useEffect(() => {
    dispatch(getHRStatus());
  }, []);

  const [filterName, setFilterName] = useState('');

  const [openConfirm, setOpenConfirm] = useState(false);

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleDeleteRow = (id: string) => {
    dispatch(deleteHRStatus(id));
  };

  const handleEditRow = (id: string) => {
    navigate(PATH_DASHBOARD.hr.statusedit(id));
  };

  const dataFiltered = applySortFilter({
    hrStatuses,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const handleOnChange = (e: any) => {
    const file = e.target.files[0];
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const isFiltered = filterName !== ''
  const denseHeight = dense ? 52 : 72;

  const isNotFound = !dataFiltered.length && !!filterName;

  const handleChangeFilter = () => {
    setFilterName('');
  };

  const handleDeleteRows = (selectedRows: string[]) => {
    const deleteRows = hrStatuses.filter((row) => !selectedRows.includes(row.id));
    setSelected([]);
    deleteRows.map((crm) => dispatch(deleteHRStatus(crm.id)));

    if (page > 0) {
      if (selectedRows.length === dataInPage.length) {
        setPage(page - 1);
      } else if (selectedRows.length === dataFiltered.length) {
        setPage(0);
      } else if (selectedRows.length > dataInPage.length) {
        const newPage = Math.ceil((hrStatuses.length - selectedRows.length) / rowsPerPage) - 1;
        setPage(newPage);
      }
    }
  };

  return (
    <Page title="Status: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Status"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.hr.root },
            { name: 'Status' },
            { name: 'List' },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.hr.statusnew}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              New Status
            </Button>
          }
          action2={
            <Button variant="contained" component="label" sx={{ ml: 3 }}>
              Import
              <input
                hidden
                type={'file'}
                id={'csvFileInput'}
                accept={'.csv'}
                onChange={handleOnChange}
              />
            </Button>
          }
        />

        <Card>
          <HRStatusTableToolbar 
          title="Total"
          total={hrStatuses.length}
          title2="Employees"
          icon="vaadin:records"
          color={theme.palette.info.main}
          filterName={filterName} 
          onFilterName={handleFilterName}
          isFiltered={isFiltered}
          onChangeFilter={handleChangeFilter}

           />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={hrStatuses.length}
                  numSelected={selected.length}
                  onSort={onSort}
                />

                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <HRStatusTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id)}
                        onSelectRow={() => onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, hrStatuses.length)}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataFiltered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />
          </Box>
        </Card>
      </Container>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows(selected);
              handleCloseConfirm();
            }}
          >
            Delete
          </Button>
        }
      />
    </Page>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({
  hrStatuses,
  comparator,
  filterName,
}: {
  hrStatuses: HRStatus[];
  comparator: (a: any, b: any) => number;
  filterName: string;
}) {
  const stabilizedThis = hrStatuses.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  hrStatuses = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    hrStatuses = hrStatuses.filter(
      (item: Record<string, any>) =>
        item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return hrStatuses;
}