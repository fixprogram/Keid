export default function PriorityTasks() {
  return (
    <section
      className="mt-8 p-6 pb-[17px] rounded-[20px] relative"
      style={{
        background:
          "radial-gradient(102.94% 100% at 72.83% 100%, #FFB8E0 0%, #BE9EFF 38.89%, #88C0FC 67.4%, #86FF99 100%)",
      }}
    >
      <div className="text-active">
        <h3 className="font-poppins font-semibold text-xl">
          Priority Task Progress
        </h3>
        <p className="font-medium text-base">3/5 is completed</p>

        <div className="flex gap-[25px] items-center mt-[17px]">
          <div className="h-[12px] w-[200px] bg-white rounded-[5px]">
            <div
              className="h-full w-[128px] "
              style={{
                background: "linear-gradient(90deg, #353843 0%, #181A20 100%)",
                borderRadius: "5px 2px 2px 5px",
              }}
            ></div>
          </div>
          <span className="text-active text-base font-bold">68.99%</span>
        </div>
      </div>
    </section>
  );
}
