import MaterialTable from "@material-table/core";
import { Avatar, ListItem, ListItemAvatar, Paper } from "@mui/material";
import { MuiTblOptions } from "utils";

const Coupons = ({ rowData }: any) => {
  return (
    <div className="flex flex-col gap-3 px-3 py-4">
      <div className="min-h-[30rem] pagination-shadow shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <MaterialTable
          data={rowData?.map((property: any, i: number) => {
            return {
              ...property,
              sl: i + 1,
            };
          })}
          components={{
            Container: (props) => <Paper {...props} elevation={5} />,
          }}
          title={
            <div className="text-lg font-bold text-themeDarkGray">Users</div>
          }
          options={{ ...MuiTblOptions(), selection: false }}
          columns={[
            {
              title: "#",
              field: "sl",
              width: "1%",
              editable: "never",
            },
            {
              title: "Profile",
              tooltip: "Profile",
              searchable: true,
              width: "20%",
              field: "photoUrl",
              render: ({ photoUrl }) => (
                <>
                  <ListItem sx={{ paddingLeft: "0px" }}>
                    <ListItemAvatar>
                      <Avatar
                        src={photoUrl}
                        alt={"img"}
                        variant={"rounded"}
                        className="!h-12 !w-12 !mr-2"
                      ></Avatar>
                    </ListItemAvatar>
                  </ListItem>
                </>
              ),
            },
            {
              title: "First Name",
              field: "firstName",
              width: "20%",
              editable: "onAdd",
              searchable: true,
            },
            {
              title: "Last Name",
              field: "lastName",
              width: "20%",
              editable: "onAdd",
              searchable: true,
            },
            {
              title: "Email",
              field: "email",
              width: "20%",
              editable: "onAdd",
              searchable: true,
            },
            {
              title: "Contact",
              field: "phoneNumber",
              width: "20%",
              editable: "onAdd",
              searchable: true,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Coupons;
