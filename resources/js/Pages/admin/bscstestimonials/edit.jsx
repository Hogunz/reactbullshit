import { NavBar } from "@/Components/NavBar";
import { Card, Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
const TABLE_HEAD = ["Id","Name", "Position"," ", "Content", "Action"];

const TABLE_ROWS = [
  {
    id: "1",
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
  },
  {
    id: "2",
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
  },
  {
    id: "3",
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
  },
  {
    id: "4",
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
  },
  {
    id: "5",
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
];

export default function TableWithStripedColumns() {
  return (
    <>
    <NavBar />
    <Card className="h-full w-full overflow-scroll mx-auto max-w-5xl">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
       <Button>Create</Button>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ id, name, job, content, date }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={name}>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {id}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {name}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {job}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {content}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {date}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography as="a" href="#" variant="small" color="green" className="font-medium">
                    Edit
                  </Typography>
                  <Typography as="a" href="#" variant="small" color="red" className="font-medium">
                    Delete
                  </Typography>
                  <Typography as="a" href="#" variant="small" color="yellow" className="font-medium">
                  Delete Permanently
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
    </>
  );
}
