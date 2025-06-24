import {
  AddTask,
  Beenhere,
  PendingActions,
  AccountCircle,
  Report,
  Verified,
  BugReport,
  Rule,
  QuestionMark,
} from "@mui/icons-material";
import {
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  styled,
  Typography,
} from "@mui/material";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";

const StatusProgress = ({ reportArr, status }: any) => {
  const But_color = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage: "linear-gradient(180deg, #8f0b00 0%, #e33324 100%);",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage: "linear-gradient(180deg, #8f0b00 0%, #e33324 100%);",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
      borderRadius: 1,
    },
  }));

  const Buy_color_root = styled("div")<{
    ownerState: { completed?: boolean; active?: boolean; pending?: boolean };
  }>(({ theme, ownerState }) => ({
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 60,
    height: 60,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
      backgroundImage: "linear-gradient(180deg, #8f0b00 0%, #e33324 100%);",
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    ...(ownerState.completed && {
      backgroundImage: "linear-gradient(180deg, #8f0b00 0%, #e33324 100%);",
    }),
  }));

  function Buy_colorIcons(props: StepIconProps) {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement } = {
      1: <AccountCircle className="!text-2xl md:!text-3xl" />,
      2: <Report className="!text-2xl md:!text-3xl" />,
      3: <Verified className="!text-2xl md:!text-3xl" />,
      4: <BugReport className="!text-2xl md:!text-3xl" />,
      5: <Rule className="!text-2xl md:!text-3xl" />,
      6: <QuestionMark className="!text-2xl md:!text-3xl" />,
      7: <QuestionMark className="!text-2xl md:!text-3xl" />,
    };

    return (
      <Buy_color_root ownerState={{ completed, active }} className={className}>
        {icons[String(props.icon)]}
      </Buy_color_root>
    );
  }
  const activeIndex = reportArr?.find((item: any) => item?.status === status);
  return (
    <div className="relative pt-1 !">
      <section className="my-5 md:py-10 hidden md:block">
        <Stack sx={{ width: "100%" }} spacing={4}>
          <Stepper
            alternativeLabel
            activeStep={activeIndex?.id}
            connector={<But_color />}
          >
            {reportArr.map((item: any) => (
              <Step key={item.id}>
                <StepLabel StepIconComponent={Buy_colorIcons}>
                  <p className="!md:text-base text-sm text-themeDarkGray font-semibold">
                    {item.title}
                  </p>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Stack>
      </section>

      {/* responsive tracker */}
      <div className="flex md:hidden">
        <Stepper activeStep={activeIndex?.id} orientation="vertical">
          {reportArr.map((step: any, index: number) => (
            <Step
              sx={{
                "& .MuiStepLabel-root .Mui-completed": {
                  color: "#4D5969 !important", // circle color (COMPLETED)
                },
                "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                  {
                    color: "#4D5969 !important", // Just text label (COMPLETED)
                  },
                "& .MuiStepLabel-root .Mui-active": {
                  color: "#E33324 !important", // circle color (ACTIVE)
                },
                "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                  {
                    color: "#fff !important", // Just text label (ACTIVE)
                  },
                "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                  fill: "#fff !important", // circle's number (ACTIVE)
                },
              }}
            >
              <StepLabel>
                <p className="!font-semibold text-base">{step.title}</p>
              </StepLabel>{" "}
            </Step>
          ))}
        </Stepper>
      </div>
    </div>
  );
};

export default StatusProgress;
