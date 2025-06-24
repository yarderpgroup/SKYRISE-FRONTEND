import MaterialTable from "@material-table/core";
import { AddLocation, Delete } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardContent,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { HeadStyle } from "components/admin/common";
import { LocationDetails } from "components/admin/manageProperty";
import { TenantLayout } from "layouts";
import { useState } from "react";
import { MuiTblOptions } from "utils";
const propertyArr = [
  {
    id: 1,
    title: "Location",
    Subtitle: "84R Salem St, Woburn, MA 01801",
  },
];
const ExteriorFeatures = [
  {
    id: 1,
    title: "Building Information",
    info: [
      {
        id: 11,
        name: "Building Area (Total): 1,851",
      },
      {
        id: 12,
        name: "Foundation Details: Concrete Perimeter",
      },
      {
        id: 13,
        name: "Year Built Source: Public Records",
      },
      {
        id: 14,
        name: "Year Built Details: Actual",
      },
      {
        id: 15,
        name: "Color: Gray",
      },
    ],
  },
  {
    id: 2,
    title: "Exterior Features",
    info: [
      {
        id: 21,
        name: "Roof: Shingle",
      },
      {
        id: 22,
        name: "Patio And Porch Features: Porch - Enclosed, Patio",
      },
    ],
  },
  {
    id: 3,
    title: "Property Information",
    info: [
      {
        id: 31,
        name: "PropertySubType: Single Family Residence",
      },
    ],
  },
  {
    id: 4,
    title: "Lot Information",
    info: [
      {
        id: 41,
        name: "Lot Size (Acres): 0.16",
      },
      {
        id: 42,
        name: "Lot Features: Easements",
      },
      {
        id: 43,
        name: "Road Surface Type: Paved",
      },
      {
        id: 44,
        name: "Road Frontage Type: Public",
      },
      {
        id: 45,
        name: "Road Responsibility: Public Maintained Road",
      },
      {
        id: 46,
        name: "Parcel Number: 909038",
      },
      {
        id: 47,
        name: "Zoning: R-2",
      },
    ],
  },
];
const InteriorFeatures = [
  {
    id: 1,
    title: "Virtural Tour Information",
    info: [
      {
        id: 11,
        name: "Virtual Tour (External Link)",
      },
      {
        id: 12,
        name: "Virtual Tour (External Link)",
      },
      {
        id: 13,
        name: "Virtual Tour (External Link)",
      },
    ],
  },
  {
    id: 2,
    title: "Living Room Information",
    info: [
      {
        id: 21,
        name: "Level: First",
      },
      {
        id: 22,
        name: "Features: Flooring - Hardwood,Window(s) - Picture,Recessed Lighting",
      },
    ],
  },
  {
    id: 3,
    title: "Master Bedroom Information",
    info: [
      {
        id: 31,
        name: "Level: First",
      },
      {
        id: 32,
        name: "Features: Closet,Flooring - Hardwood,Recessed Lighting",
      },
    ],
  },
  {
    id: 4,
    title: "Dining Room Information",
    info: [
      {
        id: 41,
        name: "Level: First",
      },
      {
        id: 42,
        name: "Features: Flooring - Hardwood",
      },
    ],
  },
  {
    id: 5,
    title: "Bedroom #2 Information",
    info: [
      {
        id: 51,
        name: "Level: Second",
      },
      {
        id: 52,
        name: "Features: Closet,Flooring - Hardwood",
      },
    ],
  },
  {
    id: 6,
    title: "Kitchen Information",
    info: [
      {
        id: 61,
        name: "Level: Main",
      },
      {
        id: 62,
        name: "Features: Flooring - Stone/Ceramic Tile Nook,Recessed Lighting, Remodeled, Stainless Steel Appliances, Gas Stove",
      },
    ],
  },
  {
    id: 7,
    title: "Bedroom #3 Information",
    info: [
      {
        id: 71,
        name: "Level: Second",
      },
      {
        id: 72,
        name: "Features: Closet,Flooring - Hardwood",
      },
    ],
  },
  {
    id: 8,
    title: "Bathroom Information",
    info: [
      {
        id: 81,
        name: "# of Bathrooms (Full): 2",
      },
    ],
  },
  {
    id: 9,
    title: "Basement Information",
    info: [
      {
        id: 91,
        name: "Basement: Full, Interior Entry, Concrete, Unfinished",
      },
    ],
  },
  {
    id: 10,
    title: "Laundry Information",
    info: [
      {
        id: 101,
        name: "Laundry Features: In Basement",
      },
    ],
  },
  {
    id: 11,
    title: "Bathroom #1 Information",
    info: [
      {
        id: 111,
        name: "Level: First",
      },
      {
        id: 112,
        name: "Features: Bathroom - Full,Bathroom - Tiled With Tub & Shower,Flooring - Stone/Ceramic Tile",
      },
    ],
  },
  {
    id: 13,
    title: "Appliances",
    info: [
      {
        id: 131,
        name: "Appliances: Range, Dishwasher, Microwave, Refrigerator, Washer, Dryer, Utility Connections for Gas Range",
      },
    ],
  },
  {
    id: 12,
    title: "Bathroom #2 Information",
    info: [
      {
        id: 121,
        name: "Level: Second",
      },
      {
        id: 122,
        name: "Features: Bathroom - Full,Bathroom - Tiled With Tub & Shower,Flooring - Stone/Ceramic Tile",
      },
    ],
  },
  {
    id: 14,
    title: "Interior Features",
    info: [
      {
        id: 141,
        name: "# of Rooms (Total): 6",
      },
      {
        id: 142,
        name: "Flooring: Wood, Tile",
      },
    ],
  },
];

const RegisteredProperty = () => {
  const [openLocation, setOpenLocation] = useState(false);
  const tabelData = [
    {
      sl: 1,
      property: "Eaton Garth Penthouse",
      location: "84R Salem St",
      type: "Flat Apartment",
      timestamp: "Jan 16, 2023 8:37 PM",
    },
  ];
  return (
    <TenantLayout title="Registered Property">
      <div>
        <div className="m-4">
          {/* <Identification
            handleClose={() => setOpenProperty(false)}
            open={openProperty}
          /> */}

          <LocationDetails
            open={openLocation}
            onClose={() => setOpenLocation(false)}
          />
          {/* <MoreDetails
            handleClose={() => setOpenInformation(false)}
            open={openInformation}
          /> */}
          <MaterialTable
            data={tabelData}
            components={{
              Container: (props) => <Paper {...props} elevation={5} />,
            }}
            title={<HeadStyle name="Registered Property" />}
            options={{ ...MuiTblOptions(), selection: false }}
            columns={[
              {
                title: "#",
                field: "sl",
                editable: "never",
                width: "2%",
              },
              {
                title: "Property Name",
                tooltip: "property",
                searchable: true,
                field: "property",
              },
              {
                title: "Owner",
                tooltip: "Owner",
                searchable: true,
                field: "displayName",
                editable: "never",
                render: () => (
                  <>
                    <ListItem sx={{ paddingLeft: "0px" }}>
                      <ListItemAvatar>
                        <Avatar
                          src="https://tsmartuk.s3.eu-west-2.amazonaws.com/a64bfc3a-46a9-4567-8221-e1f42508c2d2.png"
                          alt={"img"}
                          variant={"rounded"}
                          className="!h-12 !w-12 !mr-2"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            component="span"
                            variant="body2"
                            className="!font-medium"
                          >
                            Niki Jone
                          </Typography>
                        }
                        // secondary={email}
                        secondary={
                          <>
                            <Typography
                              component="div"
                              variant="body2"
                              className="!font-medium"
                            >
                              test@gmail.com
                            </Typography>
                            <Typography component="div" variant="body2">
                              {/* {user?.country?.code} {user?.phoneNumber} */}
                              78990895
                            </Typography>
                          </>
                        }
                      ></ListItemText>
                    </ListItem>
                  </>
                ),
              },

              {
                title: "Location",
                field: "location",
                searchable: true,
                export: true,

                //   hidden:true,
              },

              {
                title: "Property Type",
                field: "type",
              },

              {
                title: "Created At",
                field: "timestamp",
              },
              {
                title: "Actions",
                headerStyle: {
                  textAlign: "center",
                },
                export: false,
                // width: "18%",
                // field: "pick",
                render: (row) => (
                  <>
                    <div className="flex flex-row items-center gap-1 ">
                      <Tooltip title="Identification">
                        <Avatar
                          variant="rounded"
                          onClick={() => setOpenLocation(true)}
                          // onClick={() => setOpenProductInfo(row)}
                          sx={{
                            mr: ".1vw",
                            padding: "0px !important",
                            backgroundColor: "Highlight",
                            cursor: "pointer",
                            color: "",
                          }}
                        >
                          <AddLocation sx={{ padding: "0px !important" }} />
                        </Avatar>
                      </Tooltip>
                      <Tooltip title="Delete ">
                        <Avatar
                          variant="rounded"
                          className=" !mr-1 !cursor-pointer !bg-red-700"
                        >
                          <Delete className="!p-0" />
                        </Avatar>
                      </Tooltip>
                      {/* <Tooltip title="View More Info">
                        <Avatar
                          variant="rounded"
                     
                          className="!mr-1 !cursor-pointer !bg-pink-500 !p-0"
                        >
                          <Info className="!p-0" />
                        </Avatar>
                      </Tooltip> */}
                    </div>
                  </>
                ),
              },
            ]}
            detailPanel={[
              {
                render: ({ rowData }) => {
                  return (
                    <div className="bg-eef5f9 m-auto p-[20px]">
                      <Card
                        sx={{
                          minWidth: 275,
                          maxWidth: 700,
                          transition: "0.3s",
                          margin: "auto",
                          borderRadius: "10px",
                          fontWeight: "bolder",
                          wordWrap: "break-word",
                          padding: "20px",
                          boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
                          "&:hover": {
                            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
                          },
                        }}
                      >
                        <div className="flex flex-row">
                          <div className="w-full">
                            <CardContent>
                              <div className=" p-6">
                                <h1 className="mb-[5px] text-xl text-themeDarkGray">
                                  Property Details
                                </h1>
                                {propertyArr?.map((inputItem) => (
                                  <Typography
                                    variant="body1"
                                    component="p"
                                    gutterBottom
                                    align="left"
                                  >
                                    {inputItem?.title} :
                                    <span
                                      style={{
                                        color: "rgb(30, 136, 229)",
                                        fontSize: "15px",
                                      }}
                                    >
                                      {inputItem?.Subtitle}
                                    </span>
                                  </Typography>
                                ))}
                              </div>
                            </CardContent>
                          </div>
                        </div>
                      </Card>
                    </div>
                  );
                },
              },
            ]}
          />
        </div>
      </div>
    </TenantLayout>
  );
};

export default RegisteredProperty;
