import * as React from "react";
import { StrictTabProps, Tab, TabProps } from "semantic-ui-react";

const panes: StrictTabProps["panes"] = [
  {
    menuItem: "Active",
  },
  {
    menuItem: "Archived",
  },
];

interface Props {
  onlyArchived: boolean;
  onChange: (newValue: boolean) => void;
}

/**
 * Displays the active/archived tabs on the admin page.
 */
function DisplayArchivedSwitch(props: Props): JSX.Element {
  const handleTabChange = (
    _event: React.MouseEvent<HTMLDivElement>,
    data: TabProps
  ) => {
    props.onChange(data.activeIndex == 1);
  };

  return (
    <Tab
      defaultActiveIndex={props.onlyArchived ? 1 : 0}
      menu={{ secondary: true, pointing: true }}
      panes={panes}
      onTabChange={handleTabChange}
    />
  );
}

export default DisplayArchivedSwitch;
