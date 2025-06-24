import {
  Close,
  ExitToApp,
  ExpandLess,
  ExpandMore,
  Menu,
} from "@mui/icons-material";
import {
  Collapse,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { LOGO } from "assets";

import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useMenuItems } from "../../hooks";
import useAuth from "hooks/useAuth";

interface Props {
  isExpand?: boolean;
  setIsExpand: any;
}

const TenantDrawer = ({ isExpand, setIsExpand }: Props) => {
  const [selectedSubMenu, setSelectedSubMenu] = useState("");
  const { user } = useAuth();
  const router = useRouter();
  const MenuItems = useMenuItems();

  return (
    <section
      className={`absolute top-0 left-0 z-[500] h-screen pb-20 overflow-y-scroll bg-white delay-animation whitespace-nowrap scrollBarNone ${
        isExpand
          ? "w-56 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
          : "md:w-16 w-0 border-r border-primaryBorder/20"
      }`}
      onMouseEnter={() => setIsExpand(true)}
      onMouseLeave={() => setIsExpand(false)}
    >
      <div className="z-[100] flex justify-start items-center h-16 md:h-[6rem]">
        {isExpand ? (
          <span className="cursor-pointer flex items-center justify-between w-56">
            <Link href="/">
              <img
                src={LOGO.src}
                alt="YARDCRM"
                className="w-40 h-16 logo-animation"
              />
            </Link>
            <p className="flex md:hidden text-themeDarkGray px-2">
              <Close onClick={() => setIsExpand(false)} />
            </p>
          </span>
        ) : (
          <div className="w-full bg-white h-full items-center justify-center flex">
            <IconButton className="">
              <Menu className="!text-themeDarkGray" />
            </IconButton>
          </div>
        )}
      </div>
      <div className="relative z-[90] flex flex-col w-full">
        {MenuItems?.map((menuItem: any) => (
          <Fragment key={menuItem?.key}>
            <Tooltip
              title={menuItem?.title}
              followCursor
              arrow
              placement="top-end"
            >
              <div
                className={`w-full relative group flex items-center p-2 md:p-3 common-transition cursor-pointer `}
                onClick={() => {
                  if (menuItem?.route) return router?.push(menuItem?.route);
                  menuItem?.submenus &&
                    setSelectedSubMenu((prev) =>
                      prev === menuItem.key ? "" : menuItem.key
                    );
                }}
              >
                <div
                  className={
                    (router?.asPath === menuItem?.route ||
                      router?.asPath === menuItem?.defaultPath) &&
                    !isExpand
                      ? "absolute right-0 w-[2px] rounded-lg h-1/2 bg-theme"
                      : ""
                  }
                ></div>
                <div className="w-full justify-between flex items-center">
                  <div className="flex items-center gap-2">
                    <span
                      className={`${
                        // router.asPath.slice(0, 21) === menuItem.defaultPath ||

                        router?.asPath === menuItem.defaultPath ||
                        (user?.role !== "TENANT" &&
                          menuItem?.defaultPath?.includes(
                            router?.asPath?.split("/")[3]
                          )) ||
                        (user?.role === "TENANT" &&
                          menuItem?.defaultPath?.includes(
                            router?.asPath?.split("/")[4]
                          ))
                          ? // router.asPath.slice(0, 25) === menuItem.defaultPath
                            "!bg-gradient-to-br from-theme shadow-[0_8px_30px_rgb(0,0,0,0.12)] to-themeDarkGray text-white  rounded-md"
                          : "text-themeDarkGray"
                      } w-9 flex items-center justify-center h-9`}
                    >
                      {menuItem?.icon}
                    </span>
                    {isExpand ? (
                      <p
                        className={` ${
                          router.asPath === menuItem.route
                            ? "font-semibold text-themeDarkGray"
                            : "text-themeDarkGray"
                        }`}
                      >
                        {menuItem?.title}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    {menuItem?.submenus && isExpand ? (
                      selectedSubMenu === menuItem?.key ? (
                        <span className="text-themeDarkGray">
                          <ExpandLess />
                        </span>
                      ) : (
                        <span className="text-themeDarkGray">
                          <ExpandMore />
                        </span>
                      )
                    ) : null}
                  </div>
                </div>
              </div>
            </Tooltip>

            {menuItem?.submenus && isExpand ? (
              <Collapse
                in={selectedSubMenu === menuItem?.key}
                timeout="auto"
                // unmountOnExit
              >
                <List component="div" disablePadding>
                  {menuItem?.submenus?.map((submenu: any) => (
                    <ListItemButton
                      onClick={() => router.push(submenu.route)}
                      sx={{ pl: 3 }}
                      selected={router.asPath === submenu.route}
                      key={submenu?._id}
                      className={`${
                        router.asPath === submenu.route
                          ? "gradientButton !text-white"
                          : "text-themeDarkGray"
                      } flex gap-2 items-center`}
                    >
                      <ListItemIcon
                        className={
                          String(router.asPath) === submenu.route
                            ? " !text-white"
                            : " text-themeDarkGray"
                        }
                        sx={{
                          minWidth: "28px",
                          background: "transparent",
                          color: "#4D5969",
                        }}
                      >
                        {submenu?.icon}
                      </ListItemIcon>

                      <ListItemText
                        className={
                          router.asPath === submenu.route
                            ? " !text-white"
                            : " text-themeDarkGray"
                        }
                        sx={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        <h4 className="">{submenu?.title}</h4>
                      </ListItemText>
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            ) : null}
          </Fragment>
        ))}

        {/* <Tooltip
          title="Log Out"
          followCursor
          arrow
          placement="top-end"
          sx={{
            zIndex: "9900",
          }}
        >
          <div
            className={`w-full group flex items-center border-b border-white p-3 hover:bg-primary common-transition cursor-pointer ${
              isExpand ? "justify-between" : "justify-center"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-themeDarkGray">
                <ExitToApp />
              </span>
              {isExpand ? (
                <p className="text-themeDarkGray font-bold">Log Out</p>
              ) : null}
            </div>
          </div>
        </Tooltip> */}
      </div>
    </section>
  );
};

export default TenantDrawer;
