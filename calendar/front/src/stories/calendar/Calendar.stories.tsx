import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import Calendar, {
  CalendarProps,
} from "../../components/calendar/Calendar";

export default {
  title: "Calendar",
  component: Calendar,
  argTypes: {},
} as Meta;

const Template: Story<CalendarProps> = (args) => <Calendar {...args} />;

export const Default = Template.bind({});
Default.args = {
  initialDate: new Date(),
  renderDay: () => <span />,
};
