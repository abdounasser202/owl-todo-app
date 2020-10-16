import { QWeb, utils, Component, Store } from "@odoo/owl";
import { App, actions, initialState } from "./components/App";



function makeStore() {
  const localState = window.localStorage.getItem("todoapp");
  const state = localState ? JSON.parse(localState) : initialState;
  const store = new Store({ state, actions });
  store.on("update", null, () => {
    localStorage.setItem("todoapp", JSON.stringify(store.state));
  });
  return store;
}


async function start() {

  const [templates] = await Promise.all([
    utils.loadFile("templates.xml"),
    utils.whenReady()
  ]);

  const qweb = new QWeb({ templates });
  Component.env = { qweb };
  App.env.store = makeStore();
  const app = new App();
  app.mount(document.body);

}

start();
