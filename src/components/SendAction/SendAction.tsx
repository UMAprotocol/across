import React, { useState } from "react";
import { ethers } from "ethers";
import {
  useBridgeFees,
  useConnection,
  useDeposits,
  useSend,
  useTransactions,
  useBlocks,
  useAllowance,
} from "state/hooks";
import { TransactionTypes } from "state/transactions";
import { useERC20 } from "hooks";
import { CHAINS, getDepositBox, TOKENS_LIST, formatUnits, max } from "utils";
import { PrimaryButton, AccentSection } from "components";
import { Wrapper, Info } from "./SendAction.styles";
import api from "state/chainApi";

const CONFIRMATIONS = 1;
const MAX_APPROVAL_AMOUNT = ethers.constants.MaxUint256;
const SendAction: React.FC = () => {
  const {
    amount,
    fromChain,
    toChain,
    token,
    send,
    hasToApprove,
    canApprove,
    canSend,
    toAddress,
  } = useSend();
  const { account } = useConnection();

  const { block } = useBlocks(toChain);

  const [isSendPending, setSendPending] = useState(false);
  const [isApprovalPending, setApprovalPending] = useState(false);
  const { addTransaction } = useTransactions();
  const { addDeposit } = useDeposits();
  const { approve } = useERC20(token);
  const { signer } = useConnection();
  const [updateEthBalance] = api.endpoints.ethBalance.useLazyQuery();
  // trigger balance update
  const [updateBalances] = api.endpoints.balances.useLazyQuery();
  const tokenInfo = TOKENS_LIST[fromChain].find((t) => t.address === token);

  const { data: fees } = useBridgeFees(
    {
      amount,
      tokenSymbol: tokenInfo!.symbol,
      blockNumber: block?.blockNumber ?? 0,
    },
    { skip: !tokenInfo || !block || !amount.gt(0) }
  );

  const depositBox = getDepositBox(fromChain);
  const { refetch } = useAllowance(
    {
      owner: account!,
      spender: depositBox.address,
      chainId: fromChain,
      token,
      amount,
    },
    { skip: !account }
  );
  const handleApprove = async () => {
    const tx = await approve({
      amount: MAX_APPROVAL_AMOUNT,
      spender: depositBox.address,
      signer,
    });
    if (tx) {
      addTransaction({ ...tx, meta: { label: TransactionTypes.APPROVE } });
      await tx.wait(CONFIRMATIONS);
      refetch();
    }
  };
  const handleSend = async () => {
    const tx = await send();
    if (tx) {
      addTransaction({ ...tx, meta: { label: TransactionTypes.DEPOSIT } });
      const receipt = await tx.wait(CONFIRMATIONS);
      addDeposit({ tx: receipt, toChain, fromChain, amount, token, toAddress });
      // update balances after tx
      if (account) {
        updateEthBalance({ chainId: fromChain, account });
        updateBalances({ chainId: fromChain, account });
      }
    }
  };
  const handleClick = () => {
    if (amount.lte(0) || !signer) {
      return;
    }
    if (hasToApprove) {
      setApprovalPending(true);
      handleApprove()
        .catch((err) => console.error(err))
        .finally(() => setApprovalPending(false));
      return;
    }
    if (canSend) {
      setSendPending(true);
      handleSend()
        .catch((err) => console.error(err))
        // this actually happens after component unmounts, which is not good. it causes a react warning, but we need
        // it here if user cancels the send. so keep this until theres a better way.
        .finally(() => setSendPending(false));
    }
  };

  const buttonMsg = () => {
    if (isSendPending) return "Sending in progress...";
    if (isApprovalPending) return "Approval in progress...";
    if (hasToApprove) return "Approve";
    return "Send";
  };

  const amountMinusFees =
    fees && amount.gte(0)
      ? max(
          amount
            .sub(fees.instantRelayFee.total)
            .sub(fees.slowRelayFee.total)
            .sub(fees.lpFee.total),
          "0"
        )
      : amount;

  const buttonDisabled =
    isSendPending ||
    isApprovalPending ||
    (!hasToApprove && !canSend) ||
    (hasToApprove && !canApprove) ||
    amountMinusFees.lte(0);

  return (
    <AccentSection>
      <Wrapper>
        {fees && tokenInfo && (
          <>
            <Info>
              <div>Time to {CHAINS[toChain].name}</div>
              <div>~1-3 minutes</div>
            </Info>
            <Info>
              <div>Bridge Fee</div>
              <div>
                {formatUnits(
                  fees.instantRelayFee.total.add(fees.slowRelayFee.total),
                  tokenInfo.decimals
                )}{" "}
                {tokenInfo.symbol}
              </div>
            </Info>
            <Info>
              <div>You will get</div>
              <div>
                {formatUnits(amountMinusFees, tokenInfo.decimals)}{" "}
                {tokenInfo.symbol}
              </div>
            </Info>
          </>
        )}

        <PrimaryButton onClick={handleClick} disabled={buttonDisabled}>
          {buttonMsg()}
        </PrimaryButton>
      </Wrapper>
    </AccentSection>
  );
};

export default SendAction;
