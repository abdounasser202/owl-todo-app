import { Component, hooks } from "@odoo/owl";

const { useRef, useDispatch, useStore, useState } = hooks;

export const actions = {

  addTask({ state }, title) {
    title = title.trim();
    if (title) {
      const task = {
        id: state.nextId++,
        title: title,
        isCompleted: false,
      };
      state.tasks.push(task);
    }
  },

  toggleTask({ state }, id) {
    const task = state.tasks.find((t) => t.id === id);
    task.isCompleted = !task.isCompleted;
  },

  deleteTask({ state }, id) {
    const index = state.tasks.findIndex((t) => t.id === id);
    state.tasks.splice(index, 1);
  },

};

export const initialState = {
  nextId: 1,
  tasks: [],
};

export class Task extends Component {
  static template = 'Task';
  static props = ["task"];
  dispatch = useDispatch();
};

export class App extends Component {
  static template = 'App';
  static components = { Task };

  inputRef = useRef("add-input");
  tasks = useStore((state) => state.tasks);
  dispatch = useDispatch();
  filter = useState({value: "all"})

  mounted() {
    this.inputRef.el.focus();
  }

  addTask(ev) {
    // 13 is keycode for ENTER
    if (ev.keyCode === 13) {
      this.dispatch("addTask", ev.target.value);
      ev.target.value = "";
    }
  }

  get displayedTasks() {
    switch (this.filter.value) {
        case "active": return this.tasks.filter(t => !t.isCompleted);
        case "completed": return this.tasks.filter(t => t.isCompleted);
        case "all": return this.tasks;
    }
  }

  setFilter(filter) {
      this.filter.value = filter;
  }

};


