import { Button } from "@/shared/ui/Button";
import InputText from "@/shared/ui/InputText";
import { MoodType, Reflection, WorryingType } from "@prisma/client";
import { FC, useState } from "react";
import { createWithEqualityFn } from "zustand/traditional";
import { useSaveReflection } from "../model/useSaveReflection";
import { SubmitButton } from "@/shared/ui/SubmitButton";
import { useReflectionStore } from "../model/useReflectionStore";

interface ReflectionSliderPropsType {
  onClose: VoidFunction;
}

export const ReflectionSlider: FC<ReflectionSliderPropsType> = ({
  onClose,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePreviousButtonClick = () => {
    if (currentSlide === 0) {
      return onClose();
    }

    setCurrentSlide((prevSlide) => prevSlide - 1);
  };

  const handleNextButtonClick = () => {
    setCurrentSlide((prevSlide) => prevSlide + 1);
  };

  const { handleSave, isLoadingSaving } = useSaveReflection(onClose);

  return (
    <section className="w-full h-full absolute left-0 top-0 bg-background2 z-30 text-white flex flex-col p-3">
      <form action={handleSave}>
        {currentSlide === 0 ? <MoodSlide /> : null}
        {currentSlide === 1 ? <WorryingSlide /> : null}
        {currentSlide === 2 ? <ReflectionSlide /> : null}

        <div className="flex justify-between mt-auto mb-6 gap-3">
          <Button
            onClick={handlePreviousButtonClick}
            disabled={isLoadingSaving}
            style={{ opacity: isLoadingSaving ? ".5" : "1" }}
          >
            {currentSlide === 0 ? "Cancel" : "Back"}
          </Button>
          {currentSlide === 2 ? (
            <SubmitButton
              disabled={isLoadingSaving}
              style={{ opacity: isLoadingSaving ? ".5" : "1" }}
            >
              Save
            </SubmitButton>
          ) : (
            <Button onClick={handleNextButtonClick}>Next</Button>
          )}
        </div>
      </form>
    </section>
  );
};

function MoodSlide() {
  const [mood, setMood] = useReflectionStore((state) => [
    state.mood,
    state.setMood,
  ]);
  return (
    <section className="w-full">
      <h2 style={{ fontSize: 30 }}>How do you feel today?</h2>

      <div className="flex gap-5 flex-wrap">
        {Object.values(MoodType).map((item) => (
          <Button
            key={item}
            onClick={() => setMood(item)}
            style={{ backgroundColor: `${mood === item ? "#246BFD" : ""}` }}
          >
            {item}
          </Button>
        ))}
      </div>
    </section>
  );
}

function WorryingSlide() {
  const [worryings, setWorrying] = useReflectionStore((state) => [
    state.worrying,
    state.setWorrying,
  ]);

  const handleSetWorrying = (item: WorryingType) => {
    if (worryings.includes(item)) {
      const newWorryings = worryings;
      newWorryings.splice(newWorryings.indexOf(item), 1);

      return setWorrying(newWorryings);
    }

    return setWorrying([...worryings, item]);
  };

  return (
    <section className="w-full h-full">
      <h2>What is worrying you?</h2>

      <div className="flex gap-5 flex-wrap">
        {Object.values(WorryingType).map((item) => (
          <Button
            key={item}
            onClick={() => handleSetWorrying(item)}
            style={{
              backgroundColor: `${worryings.includes(item) ? "#246BFD" : ""}`,
            }}
          >
            {item}
          </Button>
        ))}
      </div>
    </section>
  );
}

function ReflectionSlide() {
  const [summary, setSummary] = useReflectionStore((state) => [
    state.summary,
    state.setSummary,
  ]);

  return (
    <section className="w-full h-full">
      <h2>How was your day?</h2>

      <InputText
        placeholder="Summary of the day"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
    </section>
  );
}
