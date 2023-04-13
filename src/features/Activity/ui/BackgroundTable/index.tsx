export default function BackgroundTable() {
  return (
    <div className="absolute w-[85%] h-[52px] left-0 bottom-[68px]">
      <table className="w-full">
        <tbody>
          <tr className="h-[26px]">
            <td
              style={{
                width: "30.5%",
                border: "1px solid rgba(255, 255, 255, .05)",
                borderLeft: "none",
              }}
            ></td>
            <td
              style={{
                width: "30.5%",
                border: "1px solid rgba(255, 255, 255, .05)",
              }}
            ></td>
            <td
              style={{
                width: "39%",
                border: "1px solid rgba(255, 255, 255, .05)",
              }}
            ></td>
          </tr>
          <tr className="h-[26px]">
            <td
              style={{
                width: "30.5%",
                border: "1px solid rgba(255, 255, 255, .05)",
                borderLeft: "none",
              }}
            ></td>
            <td
              style={{
                width: "30.5%",
                border: "1px solid rgba(255, 255, 255, .05)",
              }}
            ></td>
            <td
              style={{
                width: "39%",
                border: "1px solid rgba(255, 255, 255, .05)",
              }}
            ></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
