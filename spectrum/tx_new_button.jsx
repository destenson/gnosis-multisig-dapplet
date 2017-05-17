import React, { PropTypes, Component } from 'react';
import { Button } from 'semantic-ui-react';

import TxNewForm from './tx_new_form.jsx';

const TransactionModal = require('@digix/spectrum/src/components/transactions/transaction_modal').default;

export default class TxNewButton extends Component {
  constructor(props) {
    super(props);
    this.handleTransaction = this.handleTransaction.bind(this);
    this.handleMined = this.handleMined.bind(this);
  }
  handleTransaction({ destination, from, ethValue, gas, gasPrice, ...rest }) {
    const { contract } = this.props;
    const data = rest.data || '0x';
    const value = ethValue * 1e18;
    return contract.submitTransaction.sendTransaction(destination, value, data, { from, gas, gasPrice });
  }
  handleMined() {
    return this.props.contract.getTransactionCount.call(true, true);
  }
  render() {
    const { web3, network, defaultAddress } = this.props;
    const { handleMined, handleTransaction } = this;
    return (
      <TransactionModal
        {...{ web3, network, handleTransaction, onMined: handleMined }}
        header="New Transaction"
        data={{ from: defaultAddress && defaultAddress.address, gas: 200000 }}
        renderForm={props => <TxNewForm {...this.props} {...props} />}
        trigger={
          <Button
            basic
            content="New Transaction"
            icon="plus"
          />
        }
      />
    );
  }
}

TxNewButton.propTypes = {
  web3: PropTypes.object.isRequired,
  network: PropTypes.object.isRequired,
  defaultAddress: PropTypes.object.isRequired,
  contract: PropTypes.object.isRequired,
};
