import { Given, When, Then } from '@cucumber/cucumber';
import axios from 'axios';
import { expect } from 'chai';

let response: any;
let clients: any[];

Given('I have a new client with name {string}, email {string} and phone {string}', async function (name: string, email: string, phone: string) {
  response = await axios.post('http://localhost:3000/api/clients', {
    name: name,
    email: email,
    phone: phone
  });
  console.log(response.data);
  expect(response.status).to.equal(200);
});

When('I add the new client', async function () {
  await new Promise(resolve => setTimeout(resolve, 1000)); // wait for 1 second
  clients = (await axios.get('http://localhost:3000/api/clients')).data;
});


Then('I should see the new client in the list of clients', function () {
  const client = clients.find((c) => c.name === response.data.name && c.email === response.data.email && c.phone === response.data.phone);
  expect(client).to.exist;
});

Given('I have a list of clients', async function () {
  clients = (await axios.get('http://localhost:3000/api/clients')).data;
  expect(clients.length).to.be.greaterThan(0);
});

When('I delete a client with ID {string}', async function (clientId: string) {
  response = await axios.delete(`http://localhost:3000/api/clients/${clientId}`);
  expect(response.status).to.equal(200);
});

Then('I should no longer see the client with ID {string} in the list of clients', async function (clientId: string) {
  clients = (await axios.get('http://localhost:3000/api/clients')).data;
  const client = clients.find((c) => c.id.toString() === clientId);
  expect(client).to.not.exist;
});
