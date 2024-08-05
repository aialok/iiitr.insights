import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";

export async function AnimatedGradientTextDemo({
  text,
  element,
}: {
  text: string;
  element?: React.ReactNode;
}) {
  return (
    <div className="z-10 flex items-center justify-center  ">
      <AnimatedGradientText>
        {element} <hr className="ml-2 mr-0 h-4 w-[1px] shrink-0 bg-gray-300" />{" "}
        <span
          className={cn(
            `inline text-xs sm:text-base px-2 animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
          )}
        >
          {text}
        </span>
        <ChevronRight className="ml-0 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
      </AnimatedGradientText>
    </div>
  );
}
