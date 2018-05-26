import React, { Component } from "react";

import { StackNavigator } from "react-navigation";

import LoginScreen from "./components/LoginScreen.js";
import HomeScreen from "./components/HomeScreen.js";
import ChildrenScreen from "./components/ChildrenScreen.js";
import AccountingYearScreen from "./components/AccountingYearScreen.js";
import AccountingEntryScreen from "./components/AccountingEntryScreen.js";
import AccountingSeatScreen from "./components/AccountingSeatScreen.js";

export default (App = StackNavigator({
	Login: LoginScreen,
	Children: ChildrenScreen,
	Home: HomeScreen, 
	AccountingYear: AccountingYearScreen, 
	AccountingEntry: AccountingEntryScreen, 
	AccountingSeat: AccountingSeatScreen
}));
