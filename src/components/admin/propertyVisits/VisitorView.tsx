import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import CustomDialog from "components/core/CustomDialog";
type Props = {
  open?: boolean | any;
  onClose?: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
};
const VisitorView = ({ open, onClose, mutate }: Props) => {
  return (
    <CustomDialog
      maxWidth={"xs"}
      aria-labelledby="customized-dialog-title"
      open={open}
      onClose={() => onClose && onClose()}
    >
      <div className="">
        <List>
          <ListItem
            sx={{
              paddingLeft: "1.4vw",
              marginTop: "0vh",
            }}
          >
            <ListItemAvatar>
              <Avatar
                src="https://realestate-sy.vercel.app/_next/static/media/test-2.f6995e26.png"
                alt={"img"}
                variant={"rounded"}
                className="!h-20 !w-20 !mr-2"
              />
            </ListItemAvatar>
            <ListItemText
              secondary={
                <>
                  <div className="text-xl text-themeDarkGray font-semibold">
                    Natasha Dalal
                  </div>
                  <div className="text-themeGray text-base ">
                    test@gmail.com
                  </div>
                  <div className="text-themeGray text-base ">78905674</div>
                </>
              }
              primaryTypographyProps={{
                fontWeight: "bold",
                fontSize: "1.3vw",
                color: "#1877f2",
              }}
              secondaryTypographyProps={{
                fontSize: "1vw",
                marginTop: "1vh",
              }}
            />
          </ListItem>
        </List>
      </div>
    </CustomDialog>
  );
};

export default VisitorView;
