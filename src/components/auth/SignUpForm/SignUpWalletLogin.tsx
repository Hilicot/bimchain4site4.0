
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';
import * as S from '@app/pages/UIComponentsPage.styles';
import { MetamaskWallet } from '@app/blockchain/Wallet';
import { Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Input } from '@app/components/common/inputs/Input/Input';

interface SignUpWalletLoginProps {
  address: string;
  setAddress: (address: string) => void;
  next: () => void;
}

export const SignUpWalletLogin: React.FC<SignUpWalletLoginProps> = ({ address, setAddress, next }) => {
  const [loggedInWallet, setLoggedInWallet] = useState<boolean>(false);
  const { t } = useTranslation();
  useEffect(() => {
    MetamaskWallet.getInstance()
      .then(wallet => {
        setAddress(wallet.account);
        setLoggedInWallet(true);
      })
  }, [next, setAddress]);

  return (<>

    
    <Auth.FormItem
      name="address"
      label={t('common.address')}
      rules={[{ required: true, message: t('common.requiredField') }]}
    >
      <Auth.FormInput placeholder={address? address : "0x000000000000000000000"} disabled/>
    </Auth.FormItem>

    {!loggedInWallet ? <p style={{color:'red'}}>{"Please login in your crypto wallet."}</p> : <></>}

    <BaseForm.Item noStyle>
      <Auth.SubmitButton type="primary" onClick={next} disabled={!loggedInWallet}>
        {'Next'}
      </Auth.SubmitButton>
    </BaseForm.Item>
  </>
  )
}