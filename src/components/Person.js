import { memo, useState } from "react";
import useAnimateRerender from "@/utils/useAnimateRerender";
import Switch from "./Switch";

function Person({ isActive, name, age, gender }) {
  const [isChecked, setIsChecked] = useState(false);
  const animateRerender = useAnimateRerender();

  return (
    <div className={`flex flex-row py-4 px-4 ${animateRerender}`}>
      <div className="flex flex-col flex-1">
        <p className="">{name}</p>
        <p className="text-gray-500 text-base lg:text-lg">
          {age} yrs old, {gender}
        </p>
        {isActive && (
          <span className="bg-green-500 text-white px-2 rounded-full py-1 text-sm lg:text-base w-fit mt-4">
            Active
          </span>
        )}
      </div>
      <div className="flex items-center">
        <Switch
          value={isChecked}
          onChange={(isChecked) => setIsChecked(isChecked)}
        />
      </div>
    </div>
  );
}

export const MemoPerson = memo(Person);
export default Person;
