import { AccountingRow } from "./AccountingRow";

export default class AccountingSeat extends AccountingRow {

  getText() {
    return (this.props.seat.title + " " + this.props.seat.importe + "€");
  }

  onPress() {
    this.props.navigation("AccountingSeat", { seat: this.props.seat });
  }
}
