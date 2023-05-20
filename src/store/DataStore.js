import { makeAutoObservable } from 'mobx';

export default class DataStore {
  constructor() {
    this._contracts = {};
    this._types = {};
    this._objects = {};
    this._owners = {};
    this._services = {};
    this._users = {};
    makeAutoObservable(this);
  }

  setContracts(contracts) {
    this._contracts = contracts;
  }

  get contracts() {
    return this._contracts;
  }

  setTypes(types) {
    this._types = types;
  }

  get types() {
    return this._types;
  }

  setObjects(objects) {
    this._objects = objects;
  }

  get objects() {
    return this._objects;
  }

  setOwners(owners) {
    this._owners = owners;
  }

  get owners() {
    return this._owners;
  }

  setServices(services) {
    this._services = services;
  }

  get services() {
    return this._services;
  }

  setUsers(users) {
    this._users = users;
  }

  get users() {
    return this._users;
  }
}
