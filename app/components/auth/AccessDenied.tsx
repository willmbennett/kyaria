import AuthButton from "./AuthButton"

export default function AccessDenied() {
  return (
    <>
      <div className="flex max-w-5xl mx-auto flex-col items-center py-2 min-h-screen bg-gray-100">
        <div className="flex flex-1 w-full flex-col items-center justify-center text-center px-4">
          <h1 className="sm:text-6xl text-4xl max-w-2xl font-bold text-slate-900 mb-10">
            Access Denied
          </h1>
          <p>
          You must be signed in to view this page
          </p>
          <br />
          <AuthButton/>
        </div>
      </div>
    </>
  )
}