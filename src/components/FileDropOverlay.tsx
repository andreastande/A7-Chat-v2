import { FileUp } from "lucide-react"

export default function FileDropOverlay() {
  return (
    <div className="bg-background/70 pointer-events-none absolute inset-0 z-50 flex items-center justify-center backdrop-blur-[1px]">
      <div className="flex flex-col items-center text-center select-none">
        <div className="mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-pink-500 p-4 shadow-lg">
          <div className="rounded-xl bg-white p-3">
            <FileUp className="size-8 text-blue-600" />
          </div>
        </div>
        <p className="text-xl font-semibold text-zinc-900">Add anything</p>
        <p className="mt-1 text-sm text-zinc-600">Drop files here to add them</p>
      </div>
    </div>
  )
}
