import { Dropdown } from "react-bootstrap";
import "../../../styles/dashboard.css";

export default function DasboardOptions({ option, setOption }) {
  const roles = ["mentor", "learner", "instructor"];

  return (
    <Dropdown className="btn btn-primary p-0 m-2 float-end">
      <Dropdown.Toggle
        id="dropdown-basic"
        className="dashboard-options-dropdown-toggle text-capitalize"
      >
        {option}
      </Dropdown.Toggle>

      <Dropdown.Menu className="dashboard-options-dropdown-menu">
        {roles.map(
          (role) =>
            role != option && (
              <Dropdown.Item
                className="dashboard-options-dropdown-item text-capitalize"
                onClick={() => setOption(role)}
              >
                {role}
              </Dropdown.Item>
            )
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}
