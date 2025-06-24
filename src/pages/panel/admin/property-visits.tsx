import { PropertyVisitForm } from "components/admin/properties";
import { VisitTourCard } from "components/admin/propertyVisits";
import { TenantLayout } from "layouts";
const tourArr = [
  {
    id: "1",
    day: "20",
    month: "Jan",
    propertyName: "MA 02144",
    location: "Somerville, MA 02144",
    time: "2:00 pm",
    startTime: "2:00 pm",
    mode: "Virtual",
    endTime: "4:00 pm",
    status: "Pending",
  },
  {
    id: "1",
    day: "18",
    month: "Jan",
    time: "1:00 pm",
    propertyName: "108 Gilman #3",
    location: "Somerville, MA 02144",
    status: "Approved",
    mode: "Virtual",
    startTime: "1:00 pm",
    endTime: "4:00 pm",
  },
  {
    id: "1",
    day: "17",
    month: "Jan",
    time: "3:00 pm",
    mode: "Offline",
    propertyName: "22 Banks St #22",
    location: "Somerville, MA 02144",
    status: "Completed",
    startTime: "3:00 pm",
    endTime: "5:00 pm",
  },
];

const headingArr = [
  {
    id: 1,
    title: "Property Name",
  },
  {
    id: 5,
    title: "Total Visitor",
  },
  {
    id: 2,
    title: "Start Time",
  },
  {
    id: 3,
    title: "End Time",
  },
  {
    id: 4,
    title: "Mode",
  },
];
const PropertyVisits = () => {
  return (
    <div>
      <TenantLayout title="PropertyVisits">
        <div className="w-full py-5 md:py-10 px-3    md:px-5 ">
          <PropertyVisitForm />

          <div className="flex flex-col w-full gap-4 md:gap-5 ">
            {tourArr.map((item) => (
              <VisitTourCard curElm={item} />
            ))}
          </div>
        </div>
      </TenantLayout>
    </div>
  );
};

export default PropertyVisits;
