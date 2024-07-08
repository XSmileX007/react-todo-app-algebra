import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";

export default function VisibilityToolbar() {
  return (
    <ToggleButtonGroup type="radio" name="visibility" defaultValue={"all"}>
      <ToggleButton id="1" value="all">
        All
      </ToggleButton>
      <ToggleButton id="2" value="active">
        Active
      </ToggleButton>
      <ToggleButton id="3" value="completed">
        Completed
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
