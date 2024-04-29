import { HTMLAttributes } from "react";

type BubbleButtonProps = HTMLAttributes<HTMLButtonElement> &{
  children: React.ReactNode;
};

export function BubbleButton(props: BubbleButtonProps) {
  return (
    <button
      className="p-2 text-zinc-300 text-sm flex items-center gap-1.5 font-medium leading-none hover:text-zinc-50 hover:bg-zinc-600 data-[active=true]:text-blue-600"
      {...props}
    />
  );
}
