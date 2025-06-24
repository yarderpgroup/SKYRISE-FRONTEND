import { Avatar, ListItemAvatar } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { PaginationButton } from "components/core";
import dayjs from "dayjs";
import useSWRAPI from "hooks/useSWRAPI";
import { useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name: any, register: any, date: any, amount: any) {
  return { name, register, date, amount };
}

const rows = [
  createData("NIki JOne", "test@gmail.com", "789056790", "18/10/2019"),
  createData("NIki JOne", "test@gmail.com", "789056790", "18/10/2019"),
  createData("NIki JOne", "test@gmail.com", "789056790", "18/10/2019"),
  createData("NIki JOne", "test@gmail.com", "789056790", "18/10/2019"),
  createData("NIki JOne", "test@gmail.com", "789056790", "18/10/2019"),
  createData("NIki JOne", "test@gmail.com", "789056790", "18/10/2019"),
];

export default function CustomizedTables() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useSWRAPI(
    `dashboard/super-admin/user/recent?perPage=10&pageNo=1`
  );
  return (
    <div className="flex gap-3 flex-col">
      <div className="  py-5 flex  flex-col gap-4 rounded-xl ">
        <h1 className="text-left px-4  text-themeDarkGray text-lg font-bold ">
          Recent User
        </h1>
        <div className="w-full flex flex-col ">
          <div className="bg-themeDarkGray grid grid-cols-12 w-full p-4 items-center">
            <p className="col-span-2 text-white">Name </p>
            <p className="col-span-4  flex  text-white text-center justify-center ">
              Email
            </p>
            <p className="col-span-2  flex text-right items-end text-white justify-end ">
              Number
            </p>
            <p className="col-span-2 text-white  flex text-right items-end  justify-end ">
              Created At
            </p>
            <p className="col-span-2 text-white  flex text-right items-end  justify-end ">
              Last Login
            </p>
          </div>
          <TableContainer component={Paper} className="w-full">
            <Table
              // sx={{ minWidth: 700 }}
              aria-label="customized table"
              className="w-full"
            >
              {/* <TableHead> */}

              {/* </TableHead> */}
              <TableBody>
                {data?.data?.data?.data?.map((row: any) => (
                  <StyledTableRow key={row?.name}>
                    <StyledTableCell component="th" scope="row">
                      <div className="flex justify-start items-center">
                        <ListItemAvatar>
                          <Avatar
                            src=""
                            alt={"img"}
                            className="!h-12 !w-12 !mr-2"
                          >
                            {row?.firstName && row?.firstName[0]}
                          </Avatar>
                        </ListItemAvatar>
                        {row?.firstName} {row?.lastName}
                      </div>
                    </StyledTableCell>
                    {/* <StyledTableCell align="right">{row.name}</StyledTableCell> */}
                    <StyledTableCell align="left">{row?.email}</StyledTableCell>
                    <StyledTableCell align="center">
                      ( {row?.countryPhone}) {row.phoneNumber}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {dayjs(row?.createdAt).format("ll")}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dayjs(row?.lastLogin).format("ll")}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      {/* <div>
        {data?.data?.data?.totalCount >= 5 && (
          <PaginationButton
            setCurrentPage={setCurrentPage}
            previousDisable={data?.data?.data?.pageNo === 1}
            isLastChunk={data?.data?.data?.isLastChunk}
            currentPage={currentPage}
          />
        )}
      </div> */}
    </div>
  );
}
