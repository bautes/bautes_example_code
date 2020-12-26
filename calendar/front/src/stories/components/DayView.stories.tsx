import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { ViewDayEntry, ViewDayEntryProps } from '../../components/day-entries/DayEntry';
import { TimeRecordModel } from '../../services/response.model';

export default {
  title: 'ViewDayEntry',
  component: ViewDayEntry,
  argTypes: {
  },
} as Meta;

const Template: Story<ViewDayEntryProps> = (args) => <ViewDayEntry {...args} />;

const mockedEntry:TimeRecordModel = {
    hours: 8,
    description: "test 123",
    project: "project 123"
};

export const Default = Template.bind({});
Default.args = {
    entry: mockedEntry
};


export const LargeText = Template.bind({});
LargeText.args = {
    entry: {
        ...mockedEntry,
        description: "description with super long text foo bar lorem ipsum dolor sit amet"
    }
};
