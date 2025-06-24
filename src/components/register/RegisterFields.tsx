import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
const RegisterUser_Type = [
  {
    id: 1,
    title: "Buyer",
  },
  {
    id: 2,
    title: "Owner",
  },
  {
    id: 3,
    title: "Agent",
  },
  {
    id: 4,
    title: "Builder",
  },
];
const RegisterFields = () => {
  return (
    <div>
      <div>
        <p className="text-3xl font-semibold text-themeGray">
          Start with your free account today
        </p>
      </div>
      <div className="flex w-full gap-3 border border-black">
        <p>I am</p>
        <FormControl>
          <RadioGroup
            className="!flex border border-black w-full"
            defaultValue="Buyer"
          >
            {RegisterUser_Type.map((item) => (
              <div className="flex gap-2 w-full">
                <FormControlLabel
                  value={item.title}
                  control={<Radio />}
                  label={item.title}
                />
              </div>
            ))}
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};

export default RegisterFields;
