import { FC, ChangeEvent } from "react";
import {
  RoundBox,
  MaxButton,
  Input,
  FormButton,
  InputGroup,
  FormHeader,
} from "./PoolFormElements.styles";

interface Props {
  error: Error | undefined;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  buttonClickHandler: () => void;
}

const PoolFormElements: FC<Props> = ({ error, value, onChange }) => {
  return (
    <>
      <FormHeader>Amount</FormHeader>

      <InputGroup>
        <RoundBox
          as="label"
          htmlFor="amount"
          style={{
            // @ts-expect-error TS does not likes custom CSS vars
            "--color": error
              ? "var(--color-error-light)"
              : "var(--color-white)",
            "--outline-color": error
              ? "var(--color-error)"
              : "var(--color-primary)",
          }}
        >
          <MaxButton
            onClick={() => null}
            // disabled={!isConnected}
          >
            max
          </MaxButton>
          <Input
            placeholder="0.00"
            id="amount"
            value={value}
            onChange={onChange}
            // disabled={!isConnected}
          />
        </RoundBox>
      </InputGroup>
      <FormButton>Connect wallet</FormButton>
    </>
  );
};

export default PoolFormElements;
