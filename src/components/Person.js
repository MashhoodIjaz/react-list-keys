import { memo } from "react";
import useAnimateRerender from "@/utils/useAnimateRerender";

function Person({ isActive, name, age, gender }) {
  const animateRerender = useAnimateRerender();

  return (
    <div className={`flex flex-col py-4 px-4 ${animateRerender}`}>
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
  );
}

export const MemoPerson = memo(Person);
export default Person;
