import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import axios from 'axios';

let client: any;
let meeting: any;
let meetings: any[] = [];
let clients: any[] = [];

Given('I have a client with ID {string}', async function (clientId: string) {
  const response = await axios.get('http://localhost:3000/api/clients');
  clients = response.data;
  client = clients.find((c: any) => c.id === parseInt(clientId));
  expect(client).to.not.be.undefined;
});

Given('I have a new meeting with date {string}, time {string}, location {string}, and description {string}', function (date: string, time: string, location: string, description: string) {
  meeting = {
    id: 0,
    clientId: client.id,
    date,
    time,
    location,
    description,
    client_name: client.name
  };
  expect(meeting).to.not.be.undefined;
});

When('I schedule the new meeting for the client with ID {string}', async function (clientId: string) {
  const response = await axios.post('http://localhost:3000/api/meetings', meeting);
  console.log(response.data);
  meeting = response.data;
  expect(meeting).to.not.be.undefined;
});

Then('I should see the new meeting in the list of meetings', async function () {
  const response = await axios.get('http://localhost:3000/api/meetings');
  meetings = response.data;
  console.log(meetings);
  const newMeeting = meetings.find((m: any) => m.id === meeting.id && m.clientId === client.id);
  expect(newMeeting).to.not.be.undefined;
});

Given('I have a list of meetings', async function () {
  const response = await axios.get('http://localhost:3000/api/meetings');
  meetings = response.data;
  expect(meetings.length).to.be.greaterThan(0);
});

When('I delete a meeting with ID {string}', async function (meetingId: string) {
  await axios.delete(`http://localhost:3000/api/meetings/${meetingId}`);
});

Then('I should no longer see the meeting with ID {string} in the list of meetings', async function (meetingId: string) {
  const response = await axios.get('http://localhost:3000/api/meetings');
  meetings = response.data;
  const deletedMeeting = meetings.find((m: any) => m.id === parseInt(meetingId));
  expect(deletedMeeting).to.be.undefined;
});
