import { Avatar, Container } from "@mui/material";

const MoreInformation = () => {
  return (
    <>
      <Container
        style={{
          width: "30vw",
          marginTop: "2vh",
        }}
      >
        <>
          <h2 className="mt-10 font-semibold text-xl text-themeDarkGray">
            Property Image
          </h2>

          <div className="  !pt-5">
            <Avatar
              src={
                "https://realestate-sy.vercel.app/_next/static/media/featured1.e3f88146.png"
              }
              variant={"square"}
              alt="main-banner"
              sx={{
                mt: 0.5,
                height: 200,
                width: 350,
              }}
            />
          </div>

          {/* Video job */}
        </>
      </Container>
    </>
  );
};

export default MoreInformation;
