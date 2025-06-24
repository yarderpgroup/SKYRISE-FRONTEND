import ReactTypingEffect from "react-typing-effect";

export default function HeroAnimatedText() {
  return (
    <div className="">
      <ReactTypingEffect
        className="bg-[#e3342443] md:px-3 px-1 rounded-lg"
        speed={150}
        eraseSpeed={150}
        typingDelay={0}
        eraseDelay={3000}
        text={["Sale", "Rentals"]}
        cursor=" "
        // cursorRenderer={(cursor: any) => (
        //   <h1 style={{ display: "none" }}>{cursor}</h1>
        // )}
        displayTextRenderer={(text: any, i: any) => {
          return <h1>{text}</h1>;
        }}
      />
    </div>
  );
}
