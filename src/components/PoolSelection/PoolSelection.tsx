import { useSelect } from "downshift";

import { useSend, useBalances, useConnection } from "state/hooks";
import { formatUnits, POOL_LIST } from "utils";
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
} from "./PoolSelection.styles";

const PoolSelection = () => {
  const { account, isConnected } = useConnection();
  const { setToken, fromChain } = useSend();

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
      </Wrapper>
    </Section>
  );
};

export default PoolSelection;
