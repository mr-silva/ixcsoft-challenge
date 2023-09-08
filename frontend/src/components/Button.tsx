interface ButtonProps {
  type: "submit" | "reset" | "button"
  label: string
}

export function Button({ type, label }: ButtonProps) {
  return (
    <>
      <button
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-zinc-600 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
        type={type}
      >
        {label}
      </button>
    </>
  )
}
