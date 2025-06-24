import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import dayjs from "dayjs";
import useSWRAPI from "hooks/useSWRAPI";

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

function createData(
  name: any,
  register: any,
  date: any,
  amount: any,
  location: any,
  country: any
) {
  return { name, location, country, date };
}

const rows = [];

export default function CustomizedTables() {
  const { data } = useSWRAPI(
    `dashboard/admin/property/get-recent?perPage=7&pageNo=1`
  );
  return (
    <div className="bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] py-5 flex  flex-col gap-4 rounded-xl ">
      <h1 className="text-left px-4  text-themeDarkGray text-lg font-bold ">
        Property Details
      </h1>
      <div className="w-full flex flex-col ">
        <div className="bg-themeDarkGray grid grid-cols-12 w-full p-4 items-center">
          <p className="col-span-3 text-white">Property Name </p>
          <p className="col-span-3 text-white  flex text-right items-end  justify-end ">
            Location
          </p>
          <p className="col-span-3 text-white  flex text-right items-end  justify-end ">
            Country
          </p>
          <p className="col-span-3  flex text-right items-center text-white justify-center ">
            Date
          </p>
        </div>
        <TableContainer component={Paper} className="w-full">
          <Table aria-label="customized table" className="w-full">
            <TableBody>
              {data?.data?.data?.data?.map((row: any) => (
                <StyledTableRow key={row?.name}>
                  <StyledTableCell component="th" scope="row">
                    {row?.propertyName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row?.address}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row?.country}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {dayjs(row?.createdAt).format("lll")}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
