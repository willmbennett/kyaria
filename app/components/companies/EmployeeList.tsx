import { Employee } from "../../companies/[name]/employees/[id]/page";
import EmployeeItem from "./EmployeeItem";

export default function EmployeeList({
  employeeData,
  company,
}: {
  employeeData: Employee[],
  company: string
}) {
  return (
    <div className="container mx-auto px-4">
      {/* Grid container with responsive classes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {employeeData.filter((e: Employee) => e.summary.includes(company)).map((employee: Employee, index: number) => (
          <div key={index} className="flex justify-center">
            <EmployeeItem employee={employee} />
          </div>
        ))}
      </div>
    </div>
  );
}
