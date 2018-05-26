import { AccountingRow } from "./AccountingRow";

export default class AccountingEntry extends AccountingRow {

  getText() {
    return (this.props.entry.node.title + " " + this.props.entry.node.total + "€");
  }

  onPress() {
    this.props.navigation("AccountingEntry", { entry: this.props.entry });
  }
}
