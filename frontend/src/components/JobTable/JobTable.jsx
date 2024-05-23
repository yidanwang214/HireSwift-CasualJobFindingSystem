import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import Chip from "@mui/material/Chip";
import { Button } from "@mui/material";
import "./JobTable.css";

function createData(id, pay, jobName, startDate, endDate, employer, status) {
  return {
    id,
    pay,
    jobName,
    startDate,
    endDate,
    employer,
    status,
  };
}

const rows = [
  createData(
    1,
    100,
    "Barista",
    new Date(2024, 2, 10),
    new Date(2024, 2, 17),
    "a",
    "active"
  ),
  createData(
    2,
    100,
    "Kitchenhands",
    new Date(2024, 2, 17),
    new Date(2024, 2, 24),
    "b",
    "finished"
  ),
  createData(
    3,
    200,
    "Cleaner",
    new Date(2024, 2, 24),
    new Date(2024, 2, 31),
    "c",
    "rejected"
  ),
  createData(
    4,
    300,
    "Sous Chef",
    new Date(2024, 2, 31),
    new Date(2024, 3, 7),
    "d",
    "active"
  ),
  createData(
    5,
    150,
    "Community Worker",
    new Date(2024, 3, 7),
    new Date(2024, 3, 14),
    "e",
    "finished"
  ),
  createData(
    6,
    80,
    "Bartender",
    new Date(2024, 3, 14),
    new Date(2024, 3, 21),
    "f",
    "rejected"
  ),
  createData(
    7,
    300,
    "Accountant",
    new Date(2024, 3, 21),
    new Date(2024, 3, 28),
    "g",
    "active"
  ),
  createData(
    8,
    500,
    "Web Designer",
    new Date(2024, 3, 28),
    new Date(2024, 4, 5),
    "h",
    "finished"
  ),
  createData(
    9,
    200,
    "Copy Writer",
    new Date(2024, 4, 5),
    new Date(2024, 4, 12),
    "i",
    "rejected"
  ),
  createData(
    10,
    200,
    "Guitar Player",
    new Date(2024, 4, 12),
    new Date(2024, 4, 19),
    "j",
    "active"
  ),
  createData(
    11,
    150,
    "DJ",
    new Date(2024, 4, 19),
    new Date(2024, 4, 26),
    "k",
    "finished"
  ),
  createData(
    12,
    100,
    "Image Designer",
    new Date(2024, 4, 26),
    new Date(2024, 5, 2),
    "l",
    "rejected"
  ),
  createData(
    13,
    1000,
    "Builder",

    new Date(2024, 5, 2),
    new Date(2024, 5, 9),
    "m",
    "active"
  ),
];

//create a descending comparator to compare numeric or string values
function descendingComparator(a, b, orderBy) {
  if (typeof a[orderBy] === "number" && typeof b[orderBy] === "number") {
    return b[orderBy] - a[orderBy];
  } else if (typeof a[orderBy] === "string" && typeof b[orderBy] === "string") {
    return b[orderBy].localeCompare(a[orderBy]);
  } else if (a[orderBy] instanceof Date && b[orderBy] instanceof Date) {
    return b[orderBy] - a[orderBy];
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "jobName", numeric: false, disablePadding: true, label: "Job Name" },
  { id: "pay", numeric: true, disablePadding: true, label: "Pay" },
  {
    id: "startDate",
    numeric: false,
    disablePadding: false,
    label: "Start Date",
  },
  { id: "endDate", numeric: false, disablePadding: false, label: "End Date" },
  { id: "employer", numeric: false, disablePadding: false, label: "Employer" },
  { id: "status", numeric: false, disablePadding: false, label: "Status" },
];

function EnhancedTableHeader(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && rowCount === numSelected}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map((headCell) => {
          return (
            <TableCell
              key={headCell.id}
              align={"left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{ width: "(100/6)%", padding: "8px 16px" }}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHeader.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function SelectToolbar(props) {
  const { onFilter, isFiltered, rowsLeft } = props;
  const counts = useMemo(
    () => ({
      allJobs: rowsLeft.length,
      activeJobs: rowsLeft.filter((row) => row.status === "active").length,
      finishedJobs: rowsLeft.filter((row) => row.status === "finished").length,
      rejectedJobs: rowsLeft.filter((row) => row.status === "rejected").length,
    }),
    [rowsLeft]
  );
  return (
    <Box>
      <Button sx={{ textTransform: "none" }} onClick={() => onFilter("all")}>
        <span className="filterText">All</span>
        <span className={isFiltered === "all" ? "selectedUnderline" : ""} />
        <span className="filterNumber" style={{ color: "black" }}>
          {counts.allJobs}
        </span>
      </Button>
      <Button sx={{ textTransform: "none" }} onClick={() => onFilter("active")}>
        <span className="filterText">Active</span>
        <span className={isFiltered === "active" ? "selectedUnderline" : ""} />
        <span
          className={
            isFiltered === "active"
              ? "activeSlected filterNumber"
              : "active filterNumber"
          }
        >
          {counts.activeJobs}
        </span>
      </Button>
      <Button
        sx={{ textTransform: "none" }}
        onClick={() => onFilter("finished")}
      >
        <span className="filterText">Finished</span>
        <span
          className={isFiltered === "finished" ? "selectedUnderline" : ""}
        />
        <span
          className={
            isFiltered === "finished"
              ? "finishedSelected filterNumber"
              : "finished filterNumber"
          }
        >
          {counts.finishedJobs}
        </span>
      </Button>
      <Button
        sx={{ textTransform: "none" }}
        onClick={() => onFilter("rejected")}
      >
        <span className="filterText">Rejected</span>
        <span
          className={isFiltered === "rejected" ? "selectedUnderline" : ""}
        />
        <span
          className={
            isFiltered === "rejected"
              ? "rejectedSelected filterNumber"
              : "rejected filterNumber"
          }
        >
          {counts.rejectedJobs}
        </span>
      </Button>
    </Box>
  );
}

function EnhancedTableToolbar(props) {
  const { numSelected, onDelete } = props;
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          My Jobs
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const JobTable = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredRows, setFilteredRows] = useState(rows);
  const [rowsLeft, setRowsLeft] = useState(rows);
  const [isFiltered, setIsFiltered] = useState("all");

  const handleStatusFilter = (status) => {
    if (status === "all") {
      setFilteredRows(rowsLeft);
    } else {
      const newRows = rowsLeft.filter((row) => row.status === status);
      setFilteredRows(newRows);
    }
    setPage(0);
    setIsFiltered(status);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrderBy(property);
    setOrder(isAsc ? "desc" : "asc");
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => {
    return selected.indexOf(id) !== -1;
  };

  const handleDelete = () => {
    const newRows = rowsLeft.filter((item) => !selected.includes(item.id));
    const newFilteredRows = filteredRows.filter((item) => !selected.includes(item.id));
    console.log("====================================");
    console.log(selected);
    console.log("====================================");
    console.log("====================================");
    console.log(visibleRows);
    console.log("====================================");
    setRowsLeft(newRows);
    setFilteredRows(newFilteredRows)
    setSelected([])
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(() => {
    return stableSort(filteredRows, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      (page + 1) * rowsPerPage
    );
  }, [filteredRows, page, order, orderBy, rowsPerPage]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          onDelete={handleDelete}
        />
        <SelectToolbar
          onFilter={handleStatusFilter}
          isFiltered={isFiltered}
          rowsLeft={rowsLeft}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} size={dense ? "small" : "medium"}>
            <EnhancedTableHeader
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={filteredRows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer", flex: 1 }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox color="primary" checked={isItemSelected} />
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      padding="none"
                      sx={{ width: "20%", padding: "8px 16px" }}
                    >
                      {row.jobName}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ width: "20%", padding: "8px 16px" }}
                    >
                      ${row.pay}
                    </TableCell>

                    <TableCell
                      align="left"
                      sx={{ width: "20%", padding: "8px 16px" }}
                    >
                      {row.startDate.toLocaleDateString()}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ width: "20%", padding: "8px 16px" }}
                    >
                      {row.endDate.toLocaleDateString()}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ width: "20%", padding: "8px 16px" }}
                    >
                      {row.employer}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ width: "20%", padding: "8px 16px" }}
                    >
                      <Chip
                        label={row.status}
                        color={
                          row.status === "active"
                            ? "success"
                            : row.status === "finished"
                            ? "primary"
                            : "error"
                        }
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        }
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
};

export default JobTable;
