import Link from "next/link";

export default function Skeleton() {
  return (
    <ul>
      {[...Array(10)].map((job, index) => (
        <li key={index} className='relative animate-pulse'>
          <div className="text-left h-[624] border-2 rounded-xl block bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
          </div>
        </li>
      ))}
    </ul>
  )
}