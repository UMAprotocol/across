import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useSelect } from "downshift";

import {
  useSend,
  useBalances,
  useConnection,
  useBridgeFees,
  useBlocks,
} from "state/hooks";
import { parseUnits, formatUnits, ParsingError, POOL_LIST } from "utils";
import { Section, SectionTitle } from "../Section";

import {
  RoundBox,
  Wrapper,
  Menu,
  Item,
  InputGroup,
  ToggleButton,
  Logo,
  ToggleIcon,
  ErrorBox,
} from "./PoolSelection.styles";

const PoolSelection = () => {
  const [inputAmount, setInputAmount] = useState<string>("");
  const { account, isConnected } = useConnection();
  const { setAmount, setToken, fromChain, toChain, amount } = useSend();

  const [error, setError] = React.useState<Error>();
  const { data: balances } = useBalances(
    {
      account: account!,
      chainId: fromChain,
    },
    { skip: !account }
  );

  const {
    isOpen,
    selectedItem,
    getLabelProps,
    getToggleButtonProps,
    getItemProps,
    getMenuProps,
  } = useSelect({
    items: POOL_LIST,
    defaultSelectedItem: POOL_LIST[0],
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        setToken({ token: selectedItem.address });
      }
    },
  });

  useEffect(() => {
    if (balances && amount && inputAmount !== "") {
      const selectedIndex = POOL_LIST.findIndex(
        ({ address }) => address === selectedItem!.address
      );
      const balance = balances[selectedIndex];
      if (amount.lte(balance)) {
        // clear the previous error if it is not a parsing error
        setError((oldError) => {
          if (oldError instanceof ParsingError) {
            return oldError;
          }
          return undefined;
        });
      } else {
        setError(new Error("Insufficient balance."));
      }
    }
  }, [balances, amount, selectedItem, inputAmount]);

  const { block } = useBlocks(toChain);

  const { data: fees } = useBridgeFees(
    {
      amount,
      tokenSymbol: selectedItem!.symbol,
      blockNumber: block?.blockNumber ?? 0,
    },
    { skip: !isConnected || amount.lte(0) || !block }
  );

  const errorMsg = error
    ? error.message
    : fees?.isAmountTooLow
    ? "Bridge fee is too high. Try sending a larger amount."
    : undefined;

  const showError = error || (fees?.isAmountTooLow && amount.gt(0));

  return (
    <Section>
      <Wrapper>
        <SectionTitle>Select pool</SectionTitle>
        <InputGroup>
          <RoundBox as="label" {...getLabelProps()}>
            <ToggleButton
              type="button"
              {...getToggleButtonProps()}
              // disabled={!isConnected}
            >
              <Logo src={selectedItem?.logoURI} alt={selectedItem?.name} />
              <div>{selectedItem?.symbol}</div>
              <ToggleIcon />
            </ToggleButton>
          </RoundBox>
          <Menu {...getMenuProps()}>
            {isOpen &&
              POOL_LIST.map((token, index) => (
                <Item
                  {...getItemProps({ item: token, index })}
                  key={token.address}
                >
                  <Logo src={token.logoURI} alt={token.name} />
                  <div>{token.name}</div>
                  <div>
                    {balances &&
                      formatUnits(balances[index], selectedItem!.decimals)}
                  </div>
                </Item>
              ))}
          </Menu>
        </InputGroup>
        {showError && <ErrorBox>{errorMsg}</ErrorBox>}
      </Wrapper>
    </Section>
  );
};

export default PoolSelection;
