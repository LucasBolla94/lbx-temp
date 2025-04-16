// components/dash/ConnectWalletButton.tsx
import React from "react";
// Importa o componente WalletMultiButton que já vem com a UI pronta
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

// Você pode adicionar estilos ou container se desejar
const ConnectWalletButton: React.FC = () => {
  return (
    <div>
      <WalletMultiButton />
    </div>
  );
};

export default ConnectWalletButton;
