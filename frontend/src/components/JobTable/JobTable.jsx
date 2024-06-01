import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import client from "../../utils/request";
import axios from "axios";

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
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [filteredRows, setFilteredRows] = useState(rows);
  const [rowsLeft, setRowsLeft] = useState([]);
  const [isFiltered, setIsFiltered] = useState("all");
  const [visibleRows, setVisibleRows] = useState([]);
  const [totalRows, setTotalRows] = useState(0);

  const handleStatusFilter = (status) => {
    if (status === "all") {
      // setFilteredRows(rowsLeft);
    } else {
      const newRows = rowsLeft.filter((row) => row.status === status);
      // setFilteredRows(newRows);
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
      const newSelected = visibleRows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const fetchMyJobList = useCallback(
    (ac) => {
      client
        .post(
          "/jobs/list",
          { page: page + 1, limit: rowsPerPage },
          { signal: ac?.signal }
        )
        .then((resp) => {
          const { results, totalResults } = resp.data;
          setVisibleRows(results);
          setTotalRows(totalResults);
        })
        .catch((e) => {
          if (axios.isCancel(e)) {
            return;
          }
          console.error(e);
        });
    },
    [page, rowsPerPage]
  );

  useEffect(() => {
    const ac = new AbortController();
    fetchMyJobList(ac);

    return () => {
      ac.abort();
    };
  }, [fetchMyJobList]);

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

  const isSelected = (id) => {
    return selected.indexOf(id) !== -1;
  };

  // const handleDelete = () => {
  //   const newRows = rowsLeft.filter((item) => !selected.includes(item.id));
  //   const newFilteredRows = filteredRows.filter(
  //     (item) => !selected.includes(item.id)
  //   );
  //   console.log("====================================");
  //   console.log(selected);
  //   console.log("====================================");
  //   console.log("====================================");
  //   console.log(visibleRows);
  //   console.log("====================================");
  //   setRowsLeft(newRows);
  //   setFilteredRows(newFilteredRows);
  //   setSelected([]);
  // };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, padding: "16px 32px" }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          onDelete={() => {}}
        />
        <SelectToolbar
          onFilter={handleStatusFilter}
          isFiltered={isFiltered}
          rowsLeft={rowsLeft}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} size={"medium"}>
            <EnhancedTableHeader
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={totalRows}
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
                      {row.title}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ width: "20%", padding: "8px 16px" }}
                    >
                      ${row.salaryStart} - ${row.salaryEnd}
                    </TableCell>

                    <TableCell
                      align="left"
                      sx={{ width: "20%", padding: "8px 16px" }}
                    >
                      {/* {row.startDate.toLocaleDateString()} */}
                      {new Date(row.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ width: "20%", padding: "8px 16px" }}
                    >
                      {/* {row.endDate.toLocaleDateString()} */}
                      {new Date(row.updatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ width: "20%", padding: "8px 16px" }}
                    >
                      {row.ownerInfo?.name}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ width: "20%", padding: "8px 16px" }}
                    >
                      <Chip
                        label={row.status}
                        color={
                          // 'Opening', 'Closed', 'In progress', 'Finished'
                          row.status === "In progress" ||
                          row.status === "Opening"
                            ? "success"
                            : row.status === "Finished"
                            ? "primary"
                            : "error"
                        }
                        size="small"
                      />
                    </TableCell>
                    {/* TODO: actions */}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
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
            count={totalRows}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        }
      </Paper>
    </Box>
  );
};

export default JobTable;
