import { ethers } from "ethers";
import { FC } from "react";

interface Props {
  pool: string;
  balance: ethers.BigNumber;
}

const UserBalance: FC<Props> = () => {
  return <div>balance</div>;
};

export default UserBalance;
